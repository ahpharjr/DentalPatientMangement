import { User, Copy, Check } from "lucide-react";
import { useState } from "react";
import Card from "../ui/Card";

export default function PersonalInfoCard({ patient }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(patient.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-zinc-400" />
          <div>
            <h3 className="text-sm font-medium text-white">
              Personal Information
            </h3>
            <p className="text-xs text-zinc-400">
              Basic details about this patient
            </p>
          </div>
        </div>

        {/* Patient ID badge */}
        <button
          onClick={handleCopy}
          title="Click to copy ID"
          className="flex items-center gap-1.5 rounded-md border border-white/10 bg-zinc-800 px-2.5 py-1 text-xs text-zinc-400 hover:border-white/20 hover:text-white transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>{patient.id}</span>
            </>
          )}
        </button>
      </div>

      <div className="space-y-3 text-sm">
        <InfoRow label="Full Name" value={patient.fullName} />
        <InfoRow label="Gender" value={patient.gender} />
        <InfoRow label="Date of Birth" value={patient.dob} />
        <InfoRow label="Marital Status" value={patient.maritalStatus} />
        <InfoRow label="Clinic" value={patient.clinic} />
      </div>
    </Card>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-zinc-400">{label}</span>
      <span className="text-white">{value}</span>
    </div>
  );
}