import { ArrowLeft, Pencil, Printer, Trash2, ChevronDown } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import MedicalHistoryCard from "../../components/patients/MedicalHistoryCard";
import DentalChartsCard from "../../components/patients/DentalChartsCard";
import TreatmentHistoryCard from "../../components/patients/TreatmentHistoryCard";

export default function TreatmentDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [isSaving, setIsSaving] = useState(false);
    const [showNotes, setShowNotes] = useState(false);

    const [treatment, setTreatment] = useState({
        id,
        date: "September 29, 2025",
        status: "Ongoing",
        paymentStatus: "Unpaid",
        dentist: "Dr. Maria Santos",
        patient: {
            id: "1",
            fullName: "Dela Cruz, Juan Mantala",
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
            chiefComplaint: "",
            clinicalFindings: "",
            diagnosis: "",
            plan: "",
            followUp: "",
        },
    });

    /* ================= TOTALS ================= */

    const procedureTotal = treatment.procedures.reduce(
        (sum, proc) => sum + Number(proc.cost || 0),
        0
    );

    const medicineTotal = treatment.prescription.reduce(
        (sum, med) => sum + Number(med.price || 0),
        0
    );

    const grandTotal = procedureTotal + medicineTotal;

    /* ================= PROCEDURE FUNCTIONS ================= */

    const addProcedure = () => {
        setTreatment((prev) => ({
            ...prev,
            procedures: [
                ...prev.procedures,
                { name: "", tooth: "", findings: "", cost: 0 },
            ],
        }));
    };

    const updateProcedure = (index, field, value) => {
        setTreatment((prev) => {
            const updated = [...prev.procedures];
            updated[index][field] = field === "cost" ? Number(value) : value;
            return { ...prev, procedures: updated };
        });
    };

    const deleteProcedure = (index) => {
        setTreatment((prev) => ({
            ...prev,
            procedures: prev.procedures.filter((_, i) => i !== index),
        }));
    };

    /* ================= PRESCRIPTION FUNCTIONS ================= */

    const addPrescription = () => {
        setTreatment((prev) => ({
            ...prev,
            prescription: [
                ...prev.prescription,
                { name: "", dosage: "", price: 0 },
            ],
        }));
    };

    const updatePrescription = (index, field, value) => {
        setTreatment((prev) => {
            const updated = [...prev.prescription];
            updated[index][field] =
                field === "price" ? Number(value) : value;
            return { ...prev, prescription: updated };
        });
    };

    const deletePrescription = (index) => {
        setTreatment((prev) => ({
            ...prev,
            prescription: prev.prescription.filter((_, i) => i !== index),
        }));
    };

    /* ================= SAVE ================= */

    const handleSave = async () => {
        setIsSaving(true);

        const updatedTreatment = {
            ...treatment,
            procedureTotal,
            medicineTotal,
            grandTotal,
        };

        console.log("Saved Treatment:", updatedTreatment);

        // TODO: Replace with real API
        // await api.updateTreatment(id, updatedTreatment)

        setTimeout(() => {
            setIsSaving(false);
            alert("Treatment updated successfully!");
        }, 800);
    };

    /* ================= Update Note ================= */

    const updateNotes = (field, value) => {
        setTreatment((prev) => ({
            ...prev,
            notes: {
                ...prev.notes,
                [field]: value,
            },
        }));
    };

    /* ====================================================== */

    return (
        <div className="space-y-6">
            {/* Back */}
            <button
                onClick={() => navigate("/treatments")}
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Treatments
            </button>

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-white">
                        Treatment - {treatment.date}
                    </h1>
                    <p className="text-sm text-zinc-400">
                        Complete treatment details and clinical information
                    </p>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-500 disabled:opacity-50"
                    >
                        {isSaving ? "Saving..." : "Save Treatment"}
                    </button>

                    <button className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200">
                        <Printer className="h-4 w-4" />
                        Print Prescription
                    </button>
                </div>
            </div>

            {/* Patient */}
            <p>
                <span className="font-medium text-white">Patient: </span>
                <button
                    onClick={() => navigate(`/patients/${treatment.patient.id}`)}
                    className="text-blue-400 hover:text-blue-300 hover:underline"
                >
                    {treatment.patient.fullName}
                </button>
            </p>

            <DentalChartsCard />

            {/* ================= CLINICAL NOTES ================= */}
            <Card>
                {/* Header (Clickable) */}
                <div
                    onClick={() => setShowNotes(!showNotes)}
                    className="flex cursor-pointer items-center justify-between"
                >
                    <h3 className="text-lg font-semibold text-white">
                        Clinical Notes
                    </h3>

                    <button className="text-sm text-blue-400 hover:text-blue-300">
                        {showNotes ? "Hide" : "Show"}
                    </button>
                </div>

                {/* Content */}
                {showNotes && (
                    <div className="mt-4 space-y-4">

                        {/* Chief Complaint */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-1">
                                Chief Complaint
                            </label>
                            <textarea
                                value={treatment.notes.chiefComplaint}
                                onChange={(e) => updateNotes("chiefComplaint", e.target.value)}
                                rows={2}
                                className="w-full rounded-lg bg-zinc-800 px-3 py-2 text-sm text-white"
                                placeholder="Main reason for visit (e.g. Severe pain on lower molar)"
                            />
                        </div>

                        {/* Clinical Findings */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-1">
                                Clinical Findings
                            </label>
                            <textarea
                                value={treatment.notes.clinicalFindings}
                                onChange={(e) => updateNotes("clinicalFindings", e.target.value)}
                                rows={3}
                                className="w-full rounded-lg bg-zinc-800 px-3 py-2 text-sm text-white"
                                placeholder="Observations, exam results, x-ray findings..."
                            />
                        </div>

                        {/* Diagnosis */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-1">
                                Diagnosis
                            </label>
                            <textarea
                                value={treatment.notes.diagnosis}
                                onChange={(e) => updateNotes("diagnosis", e.target.value)}
                                rows={2}
                                className="w-full rounded-lg bg-zinc-800 px-3 py-2 text-sm text-white"
                                placeholder="Clinical diagnosis"
                            />
                        </div>

                        {/* Treatment Plan */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-1">
                                Treatment Plan
                            </label>
                            <textarea
                                value={treatment.notes.plan}
                                onChange={(e) => updateNotes("plan", e.target.value)}
                                rows={2}
                                className="w-full rounded-lg bg-zinc-800 px-3 py-2 text-sm text-white"
                                placeholder="Planned procedures and medications"
                            />
                        </div>

                        {/* Follow-up */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-1">
                                Follow-up Instructions
                            </label>
                            <textarea
                                value={treatment.notes.followUp}
                                onChange={(e) => updateNotes("followUp", e.target.value)}
                                rows={2}
                                className="w-full rounded-lg bg-zinc-800 px-3 py-2 text-sm text-white"
                                placeholder="Return visit schedule or special instructions"
                            />
                        </div>

                    </div>
                )}
            </Card>

            {/* ================= PROCEDURES ================= */}
            <Card title="Current Treatment Procedures">
                <div className="space-y-4">
                    {treatment.procedures.map((proc, index) => (
                        <div
                            key={index}
                            className="rounded-lg border border-white/10 bg-zinc-950 p-4 space-y-3"
                        >
                            <div className="flex justify-between">
                                <span className="text-sm text-white">
                                    Procedure #{index + 1}
                                </span>
                                <button
                                    onClick={() => deleteProcedure(index)}
                                    className="text-red-400 hover:text-red-300"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>

                            <input
                                value={proc.name}
                                onChange={(e) =>
                                    updateProcedure(index, "name", e.target.value)
                                }
                                placeholder="Procedure Name"
                                className="w-full rounded bg-zinc-800 px-3 py-2 text-sm text-white"
                            />

                            <div className="grid md:grid-cols-3 gap-3">
                                <input
                                    value={proc.tooth}
                                    onChange={(e) =>
                                        updateProcedure(index, "tooth", e.target.value)
                                    }
                                    placeholder="Tooth No."
                                    className="rounded bg-zinc-800 px-3 py-2 text-sm text-white"
                                />
                                <input
                                    value={proc.findings}
                                    onChange={(e) =>
                                        updateProcedure(index, "findings", e.target.value)
                                    }
                                    placeholder="Findings"
                                    className="rounded bg-zinc-800 px-3 py-2 text-sm text-white"
                                />
                                <input
                                    type="number"
                                    value={proc.cost}
                                    onChange={(e) =>
                                        updateProcedure(index, "cost", e.target.value)
                                    }
                                    placeholder="Cost"
                                    className="rounded bg-zinc-800 px-3 py-2 text-sm text-white"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-4 flex justify-between">
                    <button
                        onClick={addProcedure}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500"
                    >
                        + Add Procedure
                    </button>

                    <span className="text-sm text-white font-medium">
                        Procedure Total: ₱{procedureTotal.toFixed(2)}
                    </span>
                </div>
            </Card>

            {/* ================= PRESCRIPTION ================= */}
            <Card title="Medical Prescription">
                <div className="space-y-3">
                    {treatment.prescription.map((med, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 rounded-md border border-white/10 bg-zinc-950 p-3"
                        >
                            <input
                                value={med.name}
                                onChange={(e) =>
                                    updatePrescription(index, "name", e.target.value)
                                }
                                placeholder="Medicine"
                                className="w-1/4 rounded bg-zinc-800 px-3 py-1.5 text-sm text-white"
                            />

                            <input
                                value={med.dosage}
                                onChange={(e) =>
                                    updatePrescription(index, "dosage", e.target.value)
                                }
                                placeholder="Dosage"
                                className="flex-1 rounded bg-zinc-800 px-3 py-1.5 text-sm text-white"
                            />

                            <input
                                type="number"
                                value={med.price}
                                onChange={(e) =>
                                    updatePrescription(index, "price", e.target.value)
                                }
                                placeholder="Price"
                                className="w-28 rounded bg-zinc-800 px-3 py-1.5 text-sm text-white"
                            />

                            <button
                                onClick={() => deletePrescription(index)}
                                className="text-red-400 hover:text-red-300"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-4 flex justify-between">
                    <button
                        onClick={addPrescription}
                        className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-500"
                    >
                        + Add Medicine
                    </button>

                    <span className="text-sm text-white font-medium">
                        Medicine Total: ₱{medicineTotal.toFixed(2)}
                    </span>
                </div>
            </Card>

            {/* GRAND TOTAL */}
            <div className="text-right text-lg font-semibold text-white">
                Grand Total: ₱{grandTotal.toFixed(2)}
            </div>

            <MedicalHistoryCard />
            <TreatmentHistoryCard />
        </div>
    );
}

/* ---------- Reusable Card ---------- */
function Card({ title, children }) {
    return (
        <div className="rounded-xl border border-white/10 bg-zinc-900 p-5">
            <h3 className="mb-4 text-sm font-medium text-white">{title}</h3>
            {children}
        </div>
    );
}
