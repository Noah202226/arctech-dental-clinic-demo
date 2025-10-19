import React from "react";
import Tooth from "./Tooth";

/**
 * Layout for FDI teeth: 11-18, 21-28, 31-38, 41-48
 * props:
 *  - teethData: { [toothNumber]: { surfaces: {..}, note?, docId? } }
 *  - onSurfaceClick(tooth, surface)
 *  - onOpenNote(tooth)
 *  - statusColors
 *  - selectedStatus (string | null)
 *  - onSelectStatus(statusKey)
 */
export default function DentalChart({
  teethData = {},
  onSurfaceClick,
  onOpenNote,
  statusColors,
  selectedStatus,
  onSelectStatus,
}) {
  const quadrant = {
    upperRight: ["18", "17", "16", "15", "14", "13", "12", "11"],
    upperLeft: ["21", "22", "23", "24", "25", "26", "27", "28"],
    lowerLeft: ["38", "37", "36", "35", "34", "33", "32", "31"],
    lowerRight: ["41", "42", "43", "44", "45", "46", "47", "48"],
  };

  const statuses = [
    { key: "filling", label: "FILLING", color: "#3b82f6" }, // blue
    { key: "cavity", label: "CAVITY", color: "#ef4444" }, // red
    { key: "composite", label: "COMPOSITE", color: "#7c3aed" }, // purple
    { key: "filling2", label: "FILLING 2", color: "#10b981" }, // green
    { key: "root_fragment", label: "ROOT FRAGMENT", color: "#fb923c" }, // orange
    { key: "extraction", label: "EXTRACTION", color: "#fef08a" }, // yellow
    { key: "clear", label: "CLEAR", color: "transparent" },
  ];

  return (
    <div className="w-full text-center mt-4 space-y-6">
      {/* STATUS BUTTONS */}
      <div className="flex flex-wrap justify-center gap-2">
        {statuses.map((s) => (
          <button
            key={s.key}
            onClick={() => onSelectStatus(s.key)}
            className={`px-3 py-1 rounded-full text-sm font-semibold border ${
              selectedStatus === s.key ? "ring-2 ring-offset-1" : ""
            }`}
            style={{
              background: s.color === "transparent" ? "#fff" : s.color,
              color: s.color === "transparent" ? "#111827" : "#fff",
              borderColor: "#e5e7eb",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* UPPER ARCH */}
      <div>
        <h3 className="font-semibold mb-2">UPPER</h3>

        <div className="grid grid-cols-2 gap-10 justify-items-center">
          {/* UPPER RIGHT */}
          <div>
            <span className="text-sm font-medium block mb-2">RIGHT</span>
            <div className="flex gap-1">
              {quadrant.upperRight.map((t) => (
                <div key={t} className="flex flex-col items-center">
                  <Tooth
                    tooth={t}
                    surfaces={teethData[t]?.surfaces || {}}
                    onSurfaceClick={onSurfaceClick}
                    onCenterClick={onOpenNote}
                    statusColors={statusColors}
                    size={56}
                  />
                  <div className="text-xs mt-1">{t}</div>
                </div>
              ))}
            </div>
          </div>

          {/* UPPER LEFT */}
          <div>
            <span className="text-sm font-medium block mb-2">LEFT</span>
            <div className="flex gap-1">
              {quadrant.upperLeft.map((t) => (
                <div key={t} className="flex flex-col items-center">
                  <Tooth
                    tooth={t}
                    surfaces={teethData[t]?.surfaces || {}}
                    onSurfaceClick={onSurfaceClick}
                    onCenterClick={onOpenNote}
                    statusColors={statusColors}
                    size={56}
                  />
                  <div className="text-xs mt-1">{t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* LOWER ARCH */}
      <div>
        <h3 className="font-semibold mb-2">LOWER</h3>

        <div className="grid grid-cols-2 gap-10 justify-items-center">
          {/* LOWER RIGHT */}
          <div>
            <span className="text-sm font-medium block mb-2">RIGHT</span>
            <div className="flex gap-1">
              {quadrant.lowerRight.map((t) => (
                <div key={t} className="flex flex-col items-center">
                  <Tooth
                    tooth={t}
                    surfaces={teethData[t]?.surfaces || {}}
                    onSurfaceClick={onSurfaceClick}
                    onCenterClick={onOpenNote}
                    statusColors={statusColors}
                    size={56}
                  />
                  <div className="text-xs mt-1">{t}</div>
                </div>
              ))}
            </div>
          </div>

          {/* LOWER LEFT */}
          <div>
            <span className="text-sm font-medium block mb-2">LEFT</span>
            <div className="flex gap-1">
              {quadrant.lowerLeft.map((t) => (
                <div key={t} className="flex flex-col items-center">
                  <Tooth
                    tooth={t}
                    surfaces={teethData[t]?.surfaces || {}}
                    onSurfaceClick={onSurfaceClick}
                    onCenterClick={onOpenNote}
                    statusColors={statusColors}
                    size={56}
                  />
                  <div className="text-xs mt-1">{t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
