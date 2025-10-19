import React from "react";

/**
 * Tooth SVG with 5 clickable surfaces:
 * props:
 *  - tooth (string): tooth id e.g. "11"
 *  - surfaces: { occlusal, mesial, distal, buccal, lingual } each either null or statusKey
 *  - onSurfaceClick(tooth, surfaceKey)
 *  - onCenterClick(tooth)
 *  - size (number) px
 *  - statusColors (map of statusKey -> color)
 */
export default function Tooth({
  tooth,
  surfaces = {},
  onSurfaceClick,
  onCenterClick,
  size = 64,
  statusColors = {},
}) {
  const s = {
    occlusal: surfaces.occlusal || null,
    mesial: surfaces.mesial || null,
    distal: surfaces.distal || null,
    buccal: surfaces.buccal || null,
    lingual: surfaces.lingual || null,
  };

  const color = (key) => (key ? statusColors[key] || key : "transparent");

  // We'll draw a circle and five sectors — for simplicity approximate shapes
  const viewBox = "0 0 100 100";

  return (
    <svg
      viewBox={viewBox}
      width={size}
      height={size}
      className="cursor-pointer"
      role="img"
      aria-label={`Tooth ${tooth}`}
    >
      {/* Background ring */}
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="#ffffff"
        stroke="#e6e6e6"
        strokeWidth="2"
      />

      {/* Mesial (top) */}
      <path
        d="M50 5 L70 30 A40 40 0 0 1 30 30 Z"
        fill={color(s.mesial)}
        stroke="#ddd"
        strokeWidth="0.8"
        onClick={() => onSurfaceClick(tooth, "mesial")}
      />

      {/* Distal (bottom) */}
      <path
        d="M50 95 L30 70 A40 40 0 0 1 70 70 Z"
        fill={color(s.distal)}
        stroke="#ddd"
        strokeWidth="0.8"
        onClick={() => onSurfaceClick(tooth, "distal")}
      />

      {/* Buccal (right) */}
      <path
        d="M95 50 L70 30 A40 40 0 0 1 70 70 Z"
        fill={color(s.buccal)}
        stroke="#ddd"
        strokeWidth="0.8"
        onClick={() => onSurfaceClick(tooth, "buccal")}
      />

      {/* Lingual (left) */}
      <path
        d="M5 50 L30 70 A40 40 0 0 1 30 30 Z"
        fill={color(s.lingual)}
        stroke="#ddd"
        strokeWidth="0.8"
        onClick={() => onSurfaceClick(tooth, "lingual")}
      />

      {/* Occlusal (center) */}
      <circle
        cx="50"
        cy="50"
        r="18"
        fill={color(s.occlusal)}
        stroke="#ddd"
        strokeWidth="0.8"
        onClick={() => onSurfaceClick(tooth, "occlusal")}
      />

      {/* center label / open note */}
      <text
        x="50"
        y="55"
        textAnchor="middle"
        fontSize="10"
        fill="#1f2937"
        fontWeight="600"
        onClick={() => onCenterClick(tooth)}
        style={{ pointerEvents: "auto" }}
      >
        {tooth}
      </text>
    </svg>
  );
}
