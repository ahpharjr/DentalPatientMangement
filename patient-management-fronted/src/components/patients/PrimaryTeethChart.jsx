import { ArrowLeft, Activity } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const PRIMARY_TOOTH_NAMES = {
  A: "1st Molar",
  B: "2nd Molar",
  C: "Canine",
  D: "Lateral Incisor",
  E: "Central Incisor",

  F: "Central Incisor",
  G: "Lateral Incisor",
  H: "Canine",
  I: "1st Molar",
  J: "2nd Molar",

  K: "2nd Molar",
  L: "1st Molar",
  M: "Canine",
  N: "Lateral Incisor",
  O: "Central Incisor",

  P: "Central Incisor",
  Q: "Lateral Incisor",
  R: "Canine",
  S: "1st Molar",
  T: "2nd Molar",
};

const upperRight = ["A", "B", "C", "D", "E"];
const upperLeft = ["F", "G", "H", "I", "J"];
const lowerRight = ["K", "L", "M", "N", "O"];
const lowerLeft = ["P", "Q", "R", "S", "T"];

export default function PrimaryTeethChart() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [selectedTooth, setSelectedTooth] = useState(null);

  const Tooth = ({ label }) => (
    <div
      onClick={() => setSelectedTooth(label)}
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg
      border border-green-500 bg-green-500/10 text-sm font-medium text-green-400
      hover:ring hover:ring-green-400/40 transition"
    >
      {label}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Back */}
      <button
        onClick={() => navigate(`/patients/${id}`)}
        className="flex items-center gap-1 text-sm text-zinc-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Patient Details
      </button>

      {/* Title */}
      <div>
        <h1 className="text-2xl font-semibold text-white">
          Dela Cruz, Juan Mantala
        </h1>
        <p className="text-sm text-zinc-400">
          Primary teeth chart using Universal Numbering System (A–T)
        </p>
      </div>

      {/* Odontogram Card */}
      <div className="rounded-xl border border-white/10 bg-zinc-900 p-5">
        {/* Header */}
        <div className="mb-4 flex items-start gap-2">
          <Activity className="mt-0.5 h-4 w-4 text-white" />
          <div>
            <h3 className="text-sm font-medium text-white">
              Odontogram (Primary Teeth)
            </h3>
            <p className="text-xs text-zinc-400">
              Interactive dental chart for primary teeth using Universal
              Numbering System (A–T). Click on any tooth to view or add marking
              records.
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="mb-6 flex flex-wrap gap-4 text-xs">
          <Legend color="green" label="Healthy" />
          <Legend color="red" label="Caries" />
          <Legend color="blue" label="Filled" />
          <Legend color="yellow" label="Crown" />
          <Legend color="purple" label="Root Canal" />
          <Legend color="gray" label="Missing/Extracted" />
          <Legend color="orange" label="Problem" />
        </div>

        <div className="relative mx-auto w-fit mb-5">
          {/* Upper Jaw */}
          <div className="mb-2 text-center">
            <p className="mb-2 text-xs font-medium text-zinc-300">Upper Jaw</p>
          </div>
          <div className="relative flex items-end justify-center gap-12">
            {/* Vertical separator */}
            <div className="absolute left-1/2 top-6 bottom-0 w-px -translate-x-1/2 bg-white/20" />

            {/* Right */}
            <div className="pr-6 text-right">
              <p className="mb-3 text-xs text-zinc-500 text-center">Right</p>
              <div className="flex gap-2 justify-end">
                {upperRight.map((t) => (
                  <Tooth key={t} label={t} />
                ))}
              </div>
            </div>

            {/* Left */}
            <div className="pl-6 text-left">
              <p className="mb-3 text-xs text-zinc-500 text-center">Left</p>
              <div className="flex gap-2">
                {upperLeft.map((t) => (
                  <Tooth key={t} label={t} />
                ))}
              </div>
            </div>
          </div>

          {/* ✅ Horizontal divider BETWEEN jaws */}
          <div className="relative my-6">
            <div className="mx-auto h-px w-[75%] bg-white/20" />
          </div>

          {/* Lower Jaw */}
          <div className="relative mt-5 text-center">
            <div className="relative flex items-start justify-center gap-12">
              {/* Vertical separator */}
              <div className="absolute left-1/2 top-0 bottom-6 w-px -translate-x-1/2 bg-white/20" />

              {/* Right */}
              <div className="pr-6 text-right">
                <div className="flex gap-2 justify-end">
                  {lowerRight.map((t) => (
                    <Tooth key={t} label={t} />
                  ))}
                </div>
                <p className="mt-3 text-xs text-zinc-500 text-center">Right</p>
              </div>

              {/* Left */}
              <div className="pl-6 text-left">
                <div className="flex gap-2">
                  {lowerLeft.map((t) => (
                    <Tooth key={t} label={t} />
                  ))}
                </div>
                <p className="mt-3 text-xs text-zinc-500 text-center">Left</p>
              </div>
            </div>
            <p className="mt-2 text-xs font-medium text-zinc-300">Lower Jaw</p>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-4 gap-4 border-t border-white/10 pt-6 text-center">
          <Summary label="Healthy Teeth" value="20" color="text-green-400" />
          <Summary label="Caries" value="0" color="text-red-500" />
          <Summary label="Filled" value="0" color="text-blue-500" />
          <Summary label="Missing" value="0" color="text-zinc-400" />
        </div>
      </div>

      {selectedTooth && (
        <ToothModal
          tooth={selectedTooth}
          onClose={() => setSelectedTooth(null)}
        />
      )}

    </div>
  );
}

/* ---------- Small Components ---------- */
const legendColors = {
  green: "border-green-500 bg-green-500/20",
  red: "border-red-500 bg-red-500/20",
  blue: "border-blue-500 bg-blue-500/20",
  yellow: "border-yellow-500 bg-yellow-500/20",
  purple: "border-purple-500 bg-purple-500/20",
  gray: "border-zinc-500 bg-zinc-500/20",
  orange: "border-orange-500 bg-orange-500/20",
};

function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`h-3 w-3 rounded border ${legendColors[color]}`}
      />
      <span className="text-zinc-400">{label}</span>
    </div>
  );
}

function Summary({ label, value, color }) {
  return (
    <div>
      <p className={`text-xl font-semibold ${color}`}>{value}</p>
      <p className="text-xs text-zinc-400">{label}</p>
    </div>
  );
}

function ToothModal({ tooth, onClose }) {
  const toothName = PRIMARY_TOOTH_NAMES[tooth] || "Unknown Tooth";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="w-90 rounded-xl border border-white/10 bg-zinc-900 p-5 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium">
              Tooth {tooth} – {toothName}
            </h3>
            <span className="rounded-full border border-green-500 bg-green-500/10 px-2 py-0.5 text-xs text-green-400">
              Healthy
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <p className="mb-4 text-sm text-zinc-400">
          No markings for this tooth.
        </p>

        {/* Action */}
        <button
          className="flex w-full items-center justify-center gap-2 rounded-lg
            bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200"
        >
          <span className="text-lg">＋</span>
          Add First Marking
        </button>
      </div>
    </div>
  );
}
