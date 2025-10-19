"use client";
import React, { useEffect, useMemo, useState } from "react";
import DentalChart from "./DentalChart";
import ToothModal from "./ToothModal";
import { databases } from "@/app/lib/appwrite";
import { ID, Query } from "appwrite";
import toast from "react-hot-toast";

/**
 * Environment variables needed:
 * NEXT_PUBLIC_DATABASE_ID
 * NEXT_PUBLIC_TOOTH_COLLECTION_ID
 */

const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID;
const TOOTH_COLLECTION_ID = process.env.NEXT_PUBLIC_TOOTH_COLLECTION_ID;

const STATUS_COLORS = {
  filling: "#3b82f6", // blue
  cavity: "#ef4444", // red
  composite: "#7c3aed", // purple
  filling2: "#10b981", // green
  root_fragment: "#fb923c", // orange
  extraction: "#fef08a", // yellow
  clear: "transparent",
};

export default function PatientTeethPage({ patientId }) {
  const [teethData, setTeethData] = useState({}); // { toothNum: { surfaces: {...}, note, docId } }
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [activeTooth, setActiveTooth] = useState(null); // for note modal
  const [modalNote, setModalNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  // load all tooth docs for this patient on mount or patient change
  useEffect(() => {
    if (!patientId) return;
    setLoading(true);
    (async () => {
      try {
        const res = await databases.listDocuments(
          DATABASE_ID,
          TOOTH_COLLECTION_ID,
          [Query.equal("patient_id", patientId), Query.limit(1000)]
        );

        // map
        const map = {};
        res.documents.forEach((d) => {
          map[d.tooth_number] = {
            surfaces: d.surfaces || {},
            note: d.note || "",
            docId: d.$id,
            raw: d,
          };
        });

        setTeethData(map);
      } catch (err) {
        console.error("Failed loading teeth:", err);
        toast.error("Failed to load dental chart");
      } finally {
        setLoading(false);
      }
    })();
  }, [patientId]);

  // when opening tooth modal, prefill note from teethData
  useEffect(() => {
    if (!activeTooth) {
      setModalNote("");
      return;
    }
    const existing = teethData[activeTooth];
    setModalNote(existing ? existing.note || "" : "");
  }, [activeTooth, teethData]);

  // helper: upsert tooth document (create or update)
  async function upsertTooth(toothNumber, payload) {
    if (!patientId) throw new Error("patientId required");
    setSaving(true);

    try {
      const existing = teethData[toothNumber];
      if (existing && existing.docId) {
        // update
        await databases.updateDocument(
          DATABASE_ID,
          TOOTH_COLLECTION_ID,
          existing.docId,
          {
            ...existing.raw,
            ...payload,
          }
        );
        // refresh local
        setTeethData((prev) => ({
          ...prev,
          [toothNumber]: {
            ...prev[toothNumber],
            surfaces: payload.surfaces ?? prev[toothNumber].surfaces,
            note: payload.note ?? prev[toothNumber].note,
          },
        }));
      } else {
        // create
        const doc = await databases.createDocument(
          DATABASE_ID,
          TOOTH_COLLECTION_ID,
          ID.unique(),
          {
            patient_id: patientId,
            tooth_number: toothNumber,
            ...payload,
          }
        );
        setTeethData((prev) => ({
          ...prev,
          [toothNumber]: {
            surfaces: payload.surfaces ?? {},
            note: payload.note ?? "",
            docId: doc.$id,
            raw: doc,
          },
        }));
      }
      toast.success("Saved");
    } catch (err) {
      console.error("Upsert failed", err);
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  }

  // when a surface is clicked, apply selectedStatus to that surface
  const handleSurfaceClick = (tooth, surfaceKey) => {
    if (!selectedStatus) {
      // if no toolbar status selected, open the note modal instead
      setActiveTooth(tooth);
      return;
    }

    // toggle behavior: if clicked surface already has the same status => clear it, else set selected status
    const current = teethData[tooth] ? teethData[tooth].surfaces || {} : {};
    const newSurfaces = { ...current };
    if (current[surfaceKey] === selectedStatus) {
      newSurfaces[surfaceKey] = null;
    } else {
      newSurfaces[surfaceKey] = selectedStatus;
    }

    // update UI immediately (optimistic)
    setTeethData((prev) => ({
      ...prev,
      [tooth]: {
        ...(prev[tooth] || {}),
        surfaces: newSurfaces,
        note: prev[tooth]?.note ?? "",
        docId: prev[tooth]?.docId,
      },
    }));

    // save
    upsertTooth(tooth, { surfaces: newSurfaces });
  };

  const handleOpenNote = (tooth) => {
    setActiveTooth(tooth);
  };

  const handleSaveNote = async (tooth, note) => {
    await upsertTooth(tooth, { note });
    setActiveTooth(null);
  };

  // prepare statusColors map for Tooth components
  const statusColors = useMemo(() => {
    return STATUS_COLORS;
  }, []);

  return (
    <div>
      {loading ? (
        <div className="p-6 text-center">Loading chart...</div>
      ) : (
        <DentalChart
          teethData={teethData}
          onSurfaceClick={handleSurfaceClick}
          onOpenNote={handleOpenNote}
          statusColors={statusColors}
          selectedStatus={selectedStatus}
          onSelectStatus={(s) =>
            setSelectedStatus((prev) => (prev === s ? null : s))
          }
        />
      )}

      {activeTooth && (
        <ToothModal
          tooth={activeTooth}
          initialNote={modalNote}
          onSave={handleSaveNote}
          onClose={() => setActiveTooth(null)}
          loading={saving}
        />
      )}
    </div>
  );
}
