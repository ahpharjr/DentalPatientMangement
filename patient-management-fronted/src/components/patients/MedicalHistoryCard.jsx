import { FileText } from "lucide-react";

export default function MedicalHistoryCard() {

  return (
    <div className="rounded-xl border border-white/10 bg-zinc-900 p-5">
      {/* Header */}
      <div className="mb-4 flex items-start gap-2">
        <FileText className="mt-0.5 h-4 w-4 text-white" />
        <div>
          <h3 className="text-sm font-medium text-white">
            Medical History
          </h3>
          <p className="text-xs text-zinc-400">
            Patient's medical history and health information
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <p className="mb-2 text-sm text-zinc-300">Allergies</p>
          <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-400">
            None
          </span>
        </div>

        <div>
          <p className="mb-2 text-sm text-zinc-300">Medical Conditions</p>
          <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs text-orange-400">
            None
          </span>
        </div>

        <div>
          <p className="mb-2 text-sm text-zinc-300">Current Medications</p>
          <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
            None
          </span>
        </div>

        <div>
          <p className="mb-2 text-sm text-zinc-300">Past Surgeries</p>
          <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-400">
            None
          </span>
        </div>
      </div>
    </div>
  );
}
