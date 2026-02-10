import { ArrowLeft, Send, Pencil, Trash2, Calendar } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import { appointments } from "../../data/appointments";

export default function AppointmentDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const appointment = appointments.find((a) => a.id === id);

    if (!appointment) {
        return <div className="text-white">Appointment not found</div>;
    }

    return (
        <div className="space-y-6">
            {/* Back */}
            <button
                onClick={() => navigate("/appointments")}
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Appointments
            </button>

            {/* Header */}
            <PageHeader
                title="September 29, 2025"
                subtitle="Appointment details and information"
                action={
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800">
                            <Send className="h-4 w-4" />
                            Send Reminder
                        </button>

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

            {/* Cards */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Patient Info */}
                <Card title="Patient Information">
                    <InfoRow label="Patient Name" value={appointment.patient.name} />
                    <InfoRow label="Email" value={appointment.patient.email ?? "Not provided"} />
                    <InfoRow label="Phone" value={appointment.patient.phone ?? "Not provided"} />
                </Card>

                {/* Appointment Details */}
                <Card title="Appointment Details">
                    <InfoRow label="Date" value="September 29th, 2025" />
                    <InfoRow label="Time" value={appointment.time} />
                    <InfoRow label="Cost" value={`₱${appointment.cost.toFixed(2)}`} />
                    <InfoRow
                        label="Payment Status"
                        value={
                            <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-400">
                                Unpaid
                            </span>
                        }
                    />
                    <InfoRow label="Payment Method" value={appointment.paymentMethod} />
                    <InfoRow
                        label="Follow-up"
                        value={
                            <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                                No Follow-up
                            </span>
                        }
                    />
                </Card>
            </div>

            {/* Procedures and Findings */}
            <Card title="Procedures and Findings" icon="clipboard">
                <p className="mb-4 text-sm text-zinc-400">
                    Dental procedures performed and clinical findings
                </p>

                <div className="space-y-4">
                    {appointment.procedures.map((item, index) => (
                        <div
                            key={item.id}
                            className="rounded-lg border border-white/10 bg-zinc-950 p-4"
                        >
                            <p className="mb-2 text-sm font-medium text-white">
                                Procedure/Finding #{index + 1}
                            </p>

                            <div className="space-y-2 text-sm">
                                <div>
                                    <span className="text-zinc-400">Procedure</span>
                                    <p className="text-white">{item.procedure}</p>
                                </div>

                                <div>
                                    <span className="text-zinc-400">Findings</span>
                                    <p className="text-white">{item.findings}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500">
                    <div>
                        <p>Created: {appointment.createdAt}</p>
                        <p>Last Updated: {appointment.updatedAt}</p>
                    </div>

                    <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white">
                        ✅ The appointment has been updated successfully.
                    </div>
                </div>
            </Card>
        </div>
    );
}

/* ---------- Small reusable UI ---------- */

import { ClipboardList } from "lucide-react";

function Card({ title, children, icon }) {
    const Icon = icon === "clipboard" ? ClipboardList : Calendar;

    return (
        <div className="rounded-xl border border-white/10 bg-zinc-900 p-5">
            <div className="mb-3 flex items-center gap-2">
                <Icon className="h-4 w-4 text-zinc-400" />
                <h3 className="text-sm font-medium text-white">{title}</h3>
            </div>
            {children}
        </div>
    );
}


function InfoRow({ label, value }) {
    return (
        <div className="flex items-center justify-between border-b border-white/5 pb-2 last:border-none last:pb-0">
            <span className="text-sm text-zinc-400">{label}</span>
            <span className="text-sm text-white">{value}</span>
        </div>
    );
}
