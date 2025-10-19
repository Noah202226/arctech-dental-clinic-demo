const teeth = [
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
];

export default function DentalChart({ onSelect }) {
  return (
    <div className="grid grid-cols-8 gap-2">
      {teeth.map((tooth) => (
        <button
          key={tooth}
          onClick={() => onSelect(tooth)}
          className="border rounded p-3 hover:bg-green-200"
        >
          {tooth}
        </button>
      ))}
    </div>
  );
}
