import { User } from "lucide-react";
import Card from "../ui/Card";

export default function PersonalInfoCard({ patient }) {
  return (
    <Card>
      <div className="mb-4 flex items-center gap-2">
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
