import React, { useEffect, useState } from "react";

export default function ToothModal({
  tooth,
  initialNote = "",
  onSave,
  onClose,
  loading,
}) {
  const [note, setNote] = useState(initialNote || "");

  useEffect(() => {
    setNote(initialNote || "");
  }, [initialNote, tooth]);

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-lg">
        <h3 className="font-bold text-lg">Tooth {tooth}</h3>

        <textarea
          className="textarea textarea-bordered w-full mt-3"
          placeholder="Write patient notes..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className={`btn btn-primary ${loading ? "loading" : ""}`}
            onClick={() => onSave(tooth, note)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
