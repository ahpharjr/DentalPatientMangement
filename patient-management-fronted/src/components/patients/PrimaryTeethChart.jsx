import { ArrowLeft, Activity, Trash2 } from "lucide-react";
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

const CONDITION_STYLES = {
  healthy: "border-green-500 bg-green-500/10 text-green-400",
  caries: "border-red-500 bg-red-500/10 text-red-400",
  filled: "border-blue-500 bg-blue-500/10 text-blue-400",
  crown: "border-yellow-500 bg-yellow-500/10 text-yellow-400",
  root_canal: "border-purple-500 bg-purple-500/10 text-purple-400",
  missing: "border-zinc-500 bg-zinc-500/20 text-zinc-300",
  problem: "border-orange-500 bg-orange-500/10 text-orange-400",
};

const upperRight = ["A", "B", "C", "D", "E"];
const upperLeft = ["F", "G", "H", "I", "J"];
const lowerRight = ["K", "L", "M", "N", "O"];
const lowerLeft = ["P", "Q", "R", "S", "T"];

export default function PrimaryTeethChart() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [selectedTooth, setSelectedTooth] = useState(null);
  const [showAddMarking, setShowAddMarking] = useState(false);
  const [toothMarkings, setToothMarkings] = useState({});

  const Tooth = ({ label }) => {
    const markings = toothMarkings[label];
    const latest = markings?.[markings.length - 1];

    const style =
      CONDITION_STYLES[latest?.condition] ??
      CONDITION_STYLES.healthy;

    return (
      <div
        onClick={() => setSelectedTooth(label)}
        className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg
        border text-sm font-medium transition hover:ring hover:ring-white/30
        ${style}`}
      >
        {label}
      </div>
    );
  };

  const summary = Object.values(
    ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
      "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"]
  ).reduce(
    (acc, tooth) => {
      const markings = toothMarkings[tooth];
      const latest = markings?.[markings.length - 1];

      if (!latest) {
        acc.healthy += 1;
      } else {
        acc[latest.condition] =
          (acc[latest.condition] || 0) + 1;
      }

      return acc;
    },
    {
      healthy: 0,
      caries: 0,
      filled: 0,
      crown: 0,
      root_canal: 0,
      missing: 0,
      problem: 0,
    }
  );

  const SUMMARY_META = {
    healthy: {
      label: "Healthy Teeth",
      color: "text-green-400",
    },
    caries: {
      label: "Caries",
      color: "text-red-500",
    },
    filled: {
      label: "Filled",
      color: "text-blue-500",
    },
    crown: {
      label: "Crown",
      color: "text-yellow-500",
    },
    root_canal: {
      label: "Root Canal",
      color: "text-purple-500",
    },
    missing: {
      label: "Missing",
      color: "text-zinc-400",
    },
    problem: {
      label: "Problem",
      color: "text-orange-500",
    },
  };

  const DEFAULT_SUMMARY_KEYS = [
    "healthy",
    "caries",
    "filled",
    "missing",
  ];

  const OTHER_CONDITIONS = Object.keys(SUMMARY_META).filter(
    (k) => !DEFAULT_SUMMARY_KEYS.includes(k)
  );

  const hasOtherMarkings = OTHER_CONDITIONS.some(
    (k) => summary[k] > 0
  );

  const summaryKeysToRender = hasOtherMarkings
    ? Object.entries(summary)
      .filter(([key, value]) =>
        key === "healthy" ? true : value > 0
      )
      .map(([key]) => key)
    : DEFAULT_SUMMARY_KEYS;

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

        <div
          className="flex flex-wrap items-center justify-center gap-6
             border-t border-white/10 pt-6 text-center"
        >
          {summaryKeysToRender.map((key) => {
            const meta = SUMMARY_META[key];
            if (!meta) return null;

            return (
              <Summary
                key={key}
                label={meta.label}
                value={summary[key]}
                color={meta.color}
              />
            );
          })}
        </div>

      </div>

      {selectedTooth && !showAddMarking && (
        <ToothModal
          tooth={selectedTooth}
          markings={toothMarkings[selectedTooth] || []}
          onClose={() => setSelectedTooth(null)}
          onAddMarking={() => setShowAddMarking(true)}
        />
      )}

      {showAddMarking && selectedTooth && (
        <AddMarkingModal
          tooth={selectedTooth}
          onSave={(data) => {
            setToothMarkings(prev => ({
              ...prev,
              [selectedTooth]: [...(prev[selectedTooth] || []), data],
            }));
            setShowAddMarking(false);
          }}
          onClose={() => setShowAddMarking(false)}
        />
      )}
    </div >
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
    <div className="min-w-26">
      <p className={`text-xl font-semibold ${color}`}>{value}</p>
      <p className="text-xs text-zinc-400">{label}</p>
    </div>
  );
}


/* ---------- Tooth Modal ---------- */
function ToothModal({ tooth, markings, onClose, onAddMarking }) {
  const latest = markings.length > 0 ? markings[markings.length - 1] : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
                 bg-black/60 border border-white/20"
      onClick={onClose}
    >
      <div
        className="w-105 rounded-xl bg-zinc-900 p-5 text-white
                   border border-white/25 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold">
              Tooth {tooth} – {PRIMARY_TOOTH_NAMES[tooth]}
            </h3>

            {latest ? (
              <span
                className={`rounded-full px-2 py-0.5 text-xs border
                  ${CONDITION_STYLES[latest.condition]}`}
              >
                {latest.condition.replace("_", " ")}
              </span>
            ) : (
              <span className="rounded-full border border-green-500
                               bg-green-500/10 px-2 py-0.5 text-xs text-green-400">
                Healthy
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white text-sm"
          >
            ✕
          </button>
        </div>

        {/* Marking History Header */}
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-medium text-zinc-400">
            Marking History
          </p>

          <button
            onClick={onAddMarking}
            className="flex items-center gap-1 rounded-md
                       border border-white/10 bg-zinc-800
                       px-3 py-1 text-xs hover:bg-zinc-700"
          >
            <span className="text-sm">＋</span>
            Add Marking
          </button>
        </div>

        {/* Divider */}
        <div className="mb-3 h-px bg-white/10" />

        {/* History Content */}
        {markings.length === 0 ? (
          <p className="py-6 text-center text-sm text-zinc-400">
            No markings for this tooth.
          </p>
        ) : (
          <div className="space-y-2">
            {markings.map((m, i) => (
              <div
                key={i}
                className="flex items-center justify-between
                           rounded-lg border border-white/10
                           bg-zinc-800/50 p-3"
              >
                <div>
                  {/* <p className="text-xs text-zinc-400">{m.date}</p> */}

                  <div>
                    <span
                      className={`mt-1 inline-block rounded-full px-3 py-1
                      text-sm border ${CONDITION_STYLES[m.condition]}`}
                    >
                      {m.condition.replace("_", " ")}
                    </span>
                    <span className="pl-1 text-xs text-zinc-400">{m.date}</span>
                  </div>

                  {m.note && (
                    <p className="text-sm p-2 text-zinc-300 leading-snug">
                      {m.note}
                    </p>
                  )}
                </div>

                <button className="text-red-400 hover:text-red-500">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Add Marking Modal ---------- */
function AddMarkingModal({ tooth, onSave, onClose }) {
  const [condition, setCondition] = useState("");
  const [note, setNote] = useState("");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="w-96 rounded-xl bg-zinc-900 p-5 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold">
            Add Marking Record – Tooth {tooth} ({PRIMARY_TOOTH_NAMES[tooth]})
          </h3>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Condition */}
        <div className="mb-4">
          <label className="mb-1 block text-xs text-zinc-400">
            Condition
          </label>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="w-full rounded-md border border-white/10
                       bg-zinc-800 px-3 py-2 text-sm
                       focus:outline-none focus:ring-1 focus:ring-white/30"
          >
            <option value="">Select condition</option>
            {Object.keys(CONDITION_STYLES).map((c) => (
              <option key={c} value={c}>
                {c.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>

        {/* Notes */}
        <div className="mb-6">
          <label className="mb-1 block text-xs text-zinc-400">
            Notes
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            placeholder="Enter marking notes..."
            className="w-full rounded-md border border-white/10
                       bg-zinc-800 px-3 py-2 text-sm
                       focus:outline-none focus:ring-1 focus:ring-white/30"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            disabled={!condition}
            onClick={() =>
              onSave({
                condition,
                note,
                date: new Date().toISOString().split("T")[0],
              })
            }
            className="flex-1 rounded-md bg-zinc-300 py-2 text-sm
                       font-medium text-black
                       disabled:opacity-40"
          >
            Save Marking
          </button>

          <button
            onClick={onClose}
            className="flex-1 rounded-md border border-white/10
                       bg-zinc-800 py-2 text-sm
                       hover:bg-zinc-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}


