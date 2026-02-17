import { ArrowLeft, Printer } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { printInvoice } from "../../utils/PrintInvoice";

export default function TreatmentHistoryDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    // mock data (replace with API later)
    const treatment = {
        id,
        date: "September 29, 2025",
        status: "Completed",
        paymentStatus: "Paid",
        dentist: "Dr. Maria Santos",
        clinic: "Mong Yang Dental Clinic",
        patient: {
            id: "1",
            fullName: "Dela Cruz, Juan Mantala",
            phone: "09123456789",
            email: "juan.delacruz@email.com",
        },
        procedures: [
            {
                name: "Tooth Extraction",
                tooth: "36",
                findings: "Severe decay",
                cost: 1500,
            },
        ],
        prescription: [
            {
                name: "Amoxicillin 500mg",
                dosage: "1 capsule every 8 hours for 7 days",
                price: 350,
            },
            {
                name: "Ibuprofen 400mg",
                dosage: "1 tablet every 6 hours as needed for pain",
                price: 120,
            },
        ],
        notes: {
            chiefComplaint: "Severe pain on lower left molar",
            clinicalFindings: "Deep carious lesion on tooth 36 with periapical involvement",
            diagnosis: "Irreversible pulpitis with periapical periodontitis",
            plan: "Tooth extraction followed by antibiotic and analgesic therapy",
            followUp: "Return after 1 week for wound check. Avoid hard foods on left side.",
        },
        procedureTotal: 1500,
        medicineTotal: 470,
        grandTotal: 1970,
        payment: {
            status: "Paid",
            method: "Cash",
        },
        createdAt: "2025-09-27T18:07",
        completedAt: "2025-09-29T09:00",
    };

    const procedureTotal = treatment.procedures.reduce(
        (sum, p) => sum + Number(p.cost || 0),
        0
    );
    const medicineTotal = treatment.prescription.reduce(
        (sum, m) => sum + Number(m.price || 0),
        0
    );
    const grandTotal = procedureTotal + medicineTotal;

    const formatDateTime = (date) =>
        new Date(date).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
        });

    const hasNotes = Object.values(treatment.notes).some((v) => v?.trim());

    return (
        <div className="space-y-6">
            {/* Back */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
            >
                <ArrowLeft className="h-4 w-4" />
                Back
            </button>

            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-white">
                        Treatment History
                    </h1>
                    <p className="text-sm text-zinc-400">
                        Treatment ID: #{treatment.id} &mdash; {treatment.date}
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                        {treatment.status}
                    </span>
                    <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                            treatment.paymentStatus.toLowerCase() === "paid"
                                ? "bg-green-500/10 text-green-400"
                                : "bg-red-500/10 text-red-400"
                        }`}
                    >
                        {treatment.paymentStatus}
                    </span>
                    <button
                        onClick={() => printInvoice({ treatment, procedureTotal, medicineTotal, grandTotal })}
                        className="flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white hover:bg-zinc-800"
                    >
                        <Printer className="h-4 w-4" />
                        Print Invoice
                    </button>
                </div>
            </div>

            {/* Patient + Treatment Info */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card title="Patient Information">
                    <div className="space-y-2 text-sm">
                        <Info label="Name" value={treatment.patient.fullName} />
                        <Info label="Phone" value={treatment.patient.phone} />
                        <Info label="Email" value={treatment.patient.email} />
                    </div>
                </Card>

                <Card title="Treatment Information">
                    <div className="space-y-2 text-sm">
                        <Info label="Clinic" value={treatment.clinic} />
                        <Info label="Dentist" value={treatment.dentist} />
                        <Info label="Completed" value={formatDateTime(treatment.completedAt)} />
                        <Info label="Created" value={formatDateTime(treatment.createdAt)} />
                    </div>
                </Card>
            </div>

            {/* Clinical Notes */}
            {hasNotes && (
                <Card title="Clinical Notes">
                    <div className="space-y-3 text-sm">
                        {treatment.notes.chiefComplaint && (
                            <NoteRow label="Chief Complaint" value={treatment.notes.chiefComplaint} />
                        )}
                        {treatment.notes.clinicalFindings && (
                            <NoteRow label="Clinical Findings" value={treatment.notes.clinicalFindings} />
                        )}
                        {treatment.notes.diagnosis && (
                            <NoteRow label="Diagnosis" value={treatment.notes.diagnosis} />
                        )}
                        {treatment.notes.plan && (
                            <NoteRow label="Treatment Plan" value={treatment.notes.plan} />
                        )}
                        {treatment.notes.followUp && (
                            <NoteRow label="Follow-up Instructions" value={treatment.notes.followUp} />
                        )}
                    </div>
                </Card>
            )}

            {/* Procedures */}
            <Card title="Procedures Performed">
                <div className="space-y-3">
                    {treatment.procedures.map((proc, index) => (
                        <div
                            key={index}
                            className="rounded-lg border border-white/10 bg-zinc-950 p-4"
                        >
                            <div className="flex items-start justify-between gap-2">
                                <span className="text-sm font-medium text-white">
                                    {proc.name || "—"}
                                </span>
                                <span className="shrink-0 text-xs text-zinc-400">
                                    Tooth: {proc.tooth || "—"}
                                </span>
                            </div>

                            {proc.findings && (
                                <p className="mt-1.5 text-sm text-zinc-400">{proc.findings}</p>
                            )}

                            <p className="mt-2 text-sm font-medium text-white">
                                ₱{Number(proc.cost || 0).toFixed(2)}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-4 flex justify-end">
                    <span className="text-sm font-medium text-zinc-300">
                        Procedures Total:{" "}
                        <span className="text-white">₱{procedureTotal.toFixed(2)}</span>
                    </span>
                </div>
            </Card>

            {/* Prescription */}
            <Card title="Prescription">
                <div className="space-y-2">
                    {treatment.prescription.map((med, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-zinc-950 px-4 py-3"
                        >
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">
                                    {med.name || "—"}
                                </p>
                                <p className="text-xs text-zinc-400 mt-0.5">{med.dosage || "—"}</p>
                            </div>
                            <span className="shrink-0 text-sm text-zinc-300">
                                ₱{Number(med.price || 0).toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="mt-4 flex justify-end">
                    <span className="text-sm font-medium text-zinc-300">
                        Medicines Total:{" "}
                        <span className="text-white">₱{medicineTotal.toFixed(2)}</span>
                    </span>
                </div>
            </Card>

            {/* Payment Summary */}
            <Card title="Payment Summary">
                <div className="grid gap-4 sm:grid-cols-3 text-sm">
                    <Info
                        label="Status"
                        value={
                            <span
                                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                    treatment.payment.status.toLowerCase() === "paid"
                                        ? "bg-green-500/10 text-green-400"
                                        : "bg-red-500/10 text-red-400"
                                }`}
                            >
                                {treatment.payment.status.toUpperCase()}
                            </span>
                        }
                    />
                    <Info label="Method" value={treatment.payment.method} />
                    <Info label="Grand Total" value={`₱${grandTotal.toFixed(2)}`} />
                </div>
            </Card>

            {/* Grand Total */}
            <div className="rounded-xl border border-white/10 bg-zinc-900 px-5 py-4 flex items-center justify-between">
                <span className="text-sm text-zinc-400">Grand Total</span>
                <span className="text-lg font-semibold text-white">
                    ₱{grandTotal.toFixed(2)}
                </span>
            </div>
        </div>
    );
}

/* ---------- Card ---------- */
function Card({ title, children }) {
    return (
        <div className="rounded-xl border border-white/10 bg-zinc-900 p-5">
            <h3 className="mb-4 text-sm font-medium text-white">{title}</h3>
            {children}
        </div>
    );
}

/* ---------- Info Row ---------- */
function Info({ label, value }) {
    return (
        <div className="flex justify-between gap-4">
            <span className="text-zinc-400 shrink-0">{label}</span>
            <span className="text-white text-right">{value}</span>
        </div>
    );
}

/* ---------- Note Row ---------- */
function NoteRow({ label, value }) {
    return (
        <div className="space-y-1">
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide">{label}</p>
            <p className="text-zinc-200 leading-relaxed">{value}</p>
        </div>
    );
}