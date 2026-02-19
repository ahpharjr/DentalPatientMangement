import { ArrowLeft, Pencil, Trash2, Calendar, ClipboardList, User } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import { appointments } from "../../data/appointments";
import { patients } from "../../data/patients";
import CopyableId from "../../components/ui/CopyableId";

export default function AppointmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const appointment = appointments.find((a) => a.id === id);
  const patient = patients.find((p) => p.id === appointment?.patientId);

  if (!appointment) return <div className="text-white">Appointment not found</div>;

  const formattedDate = new Date(appointment.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const paymentBadge = {
    PAID:    { label: "Paid",    className: "bg-green-500/10 text-green-400" },
    UNPAID:  { label: "Unpaid",  className: "bg-red-500/10 text-red-400" },
    PARTIAL: { label: "Partial", className: "bg-yellow-500/10 text-yellow-400" },
  }[appointment.paymentStatus] ?? { label: appointment.paymentStatus, className: "bg-zinc-800 text-zinc-300" };

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate("/appointments")}
        className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Appointments
      </button>

      <PageHeader
        title={formattedDate}
        subtitle="Appointment details and information"
        action={
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/appointments/${id}/edit`)}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800"
            >
              <Pencil className="h-4 w-4" />
              Edit Appointment
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-500">
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        }
      />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Patient Info */}
        <Card title="Patient Information" icon={User}>
          <InfoRow label="Patient Name" value={patient?.name ?? "Unknown"} />
          <InfoRow label="Patient ID" value={<CopyableId value={appointment.patientId} />} />
          <InfoRow label="Email" value={patient?.email ?? "Not provided"} />
          <InfoRow label="Phone" value={patient?.phone ?? "Not provided"} />
        </Card>

        {/* Appointment Details */}
        <Card title="Appointment Details" icon={Calendar}>
          <InfoRow label="Date" value={formattedDate} />
          <InfoRow label="Time" value={appointment.time} />
          <InfoRow label="Cost" value={`¥${appointment.cost.toLocaleString("en-PH", { minimumFractionDigits: 2 })}`} />
          <InfoRow
            label="Payment Status"
            value={
              <span className={`rounded-full px-3 py-1 text-xs ${paymentBadge.className}`}>
                {paymentBadge.label}
              </span>
            }
          />
          <InfoRow label="Payment Method" value={appointment.paymentMethod} />
          <InfoRow
            label="Follow-up"
            value={
              appointment.followUp && appointment.nextAppointment ? (
                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                  {new Date(appointment.nextAppointment).toLocaleDateString("en-US", {
                    month: "short", day: "numeric", year: "numeric",
                  })}
                </span>
              ) : (
                <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400">
                  No Follow-up
                </span>
              )
            }
          />
        </Card>
      </div>

      {/* Procedures and Findings */}
      <Card title="Procedures and Findings" icon={ClipboardList}>
        <p className="mb-4 text-sm text-zinc-400">
          Dental procedures performed and clinical findings
        </p>

        <div className="space-y-4">
          {appointment.procedures.map((item, index) => (
            <div key={item.id} className="rounded-lg border border-white/10 bg-zinc-950 p-4">
              <p className="mb-3 text-sm font-medium text-white">
                Procedure #{index + 1}
              </p>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-xs text-zinc-500 uppercase tracking-wide">Procedure</span>
                  <p className="mt-0.5 text-white">{item.procedure}</p>
                </div>
                <div>
                  <span className="text-xs text-zinc-500 uppercase tracking-wide">Findings</span>
                  <p className="mt-0.5 text-zinc-300">{item.findings}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-4 text-xs text-zinc-500">
          <div className="space-y-0.5">
            <p>Created: {appointment.createdAt}</p>
            <p>Last Updated: {appointment.updatedAt}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function Card({ title, icon: Icon, children }) {
  return (
    <div className="rounded-xl border border-white/10 bg-zinc-900 p-5">
      <div className="mb-4 flex items-center gap-2">
        <Icon className="h-4 w-4 text-zinc-400" />
        <h3 className="text-sm font-medium text-white">{title}</h3>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 pb-3 last:border-none last:pb-0">
      <span className="text-sm text-zinc-400">{label}</span>
      <span className="text-sm text-white">{value}</span>
    </div>
  );
}