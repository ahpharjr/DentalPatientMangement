import { ArrowLeft, Printer } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function TreatmentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  // mock data (replace with API later)
  const treatment = {
    id,
    status: "completed",
    patient: {
      name: "Dela Cruz, Juan",
      phone: "09123456789",
      email: "Not provided",
    },
    clinic: "Mong Yang Dental Clinic",
    dentist: "Dr. Smith",
    completedAt: "2025-09-29T09:00",
    payment: {
      status: "paid",
      method: "Cash",
      total: 200,
    },
    procedures: [
      {
        id: 1,
        name: "Dental Cleaning",
        tooth: "All",
        findings: "Advised to clean again after 3 months",
      },
    ],
    createdAt: "2025-09-27T18:07",
    updatedAt: "2025-09-27T18:09",
  };

  const formatDateTime = (date) =>
    new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="rounded-lg border border-white/10 bg-zinc-900 p-2 hover:bg-zinc-800"
          >
            <ArrowLeft className="h-4 w-4 text-white" />
          </button>

          <div>
            <h1 className="text-xl font-semibold text-white">
              Treatment Details
            </h1>
            <p className="text-sm text-zinc-400">
              Treatment ID: #{treatment.id}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
            Completed
          </span>

          <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white hover:bg-zinc-800">
            <Printer className="h-4 w-4" />
            Print
          </button>
        </div>
      </div>

      {/* Patient + Treatment Info */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Patient Info */}
        <div className="rounded-lg border border-white/10 bg-zinc-900 p-4">
          <h3 className="mb-4 text-sm font-medium text-white">
            Patient Information
          </h3>

          <div className="space-y-2 text-sm">
            <Info label="Name" value={treatment.patient.name} />
            <Info label="Phone" value={treatment.patient.phone} />
            <Info label="Email" value={treatment.patient.email} />
          </div>
        </div>

        {/* Treatment Info */}
        <div className="rounded-lg border border-white/10 bg-zinc-900 p-4">
          <h3 className="mb-4 text-sm font-medium text-white">
            Treatment Information
          </h3>

          <div className="space-y-2 text-sm">
            <Info label="Clinic" value={treatment.clinic} />
            <Info label="Dentist" value={treatment.dentist} />
            <Info
              label="Completed At"
              value={formatDateTime(treatment.completedAt)}
            />
          </div>
        </div>
      </div>

      {/* Procedures */}
      <div className="rounded-lg border border-white/10 bg-zinc-900 p-4">
        <h3 className="mb-4 text-sm font-medium text-white">
          Procedures & Findings
        </h3>

        <div className="space-y-4">
          {treatment.procedures.map((p) => (
            <div
              key={p.id}
              className="rounded-lg border border-white/10 bg-zinc-950 p-3"
            >
              <div className="flex justify-between text-sm">
                <span className="font-medium text-white">{p.name}</span>
                <span className="text-zinc-400">Tooth: {p.tooth}</span>
              </div>

              <p className="mt-2 text-sm text-zinc-300">
                {p.findings}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Summary */}
      <div className="rounded-lg border border-white/10 bg-zinc-900 p-4">
        <h3 className="mb-4 text-sm font-medium text-white">
          Payment Summary
        </h3>

        <div className="grid gap-4 sm:grid-cols-3 text-sm">
          <Info
            label="Payment Status"
            value={
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium
                ${
                  treatment.payment.status === "paid"
                    ? "bg-green-500/10 text-green-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {treatment.payment.status.toUpperCase()}
              </span>
            }
          />

          <Info label="Method" value={treatment.payment.method} />
          <Info
            label="Total Cost"
            value={`₱${treatment.payment.total.toFixed(2)}`}
          />
        </div>
      </div>

      {/* Metadata */}
      <div className="text-xs text-zinc-500">
        Created: {formatDateTime(treatment.createdAt)} • Last updated:{" "}
        {formatDateTime(treatment.updatedAt)}
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-zinc-400">{label}</span>
      <span className="text-white">{value}</span>
    </div>
  );
}
