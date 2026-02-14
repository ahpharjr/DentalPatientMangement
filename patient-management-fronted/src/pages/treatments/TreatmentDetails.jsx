import { ArrowLeft, Pencil, Printer } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import MedicalHistoryCard from "../../components/patients/MedicalHistoryCard";
import DentalChartsCard from "../../components/patients/DentalChartsCard";
import TreatmentHistoryCard from "../../components/patients/TreatmentHistoryCard";

export default function TreatmentDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Mock treatment data
    const treatment = {
        id,
        date: "September 29, 2025",
        status: "Ongoing",
        paymentStatus: "Unpaid",
        total: 1500,
        dentist: "Dr. Maria Santos",
        notes: "Patient complained of pain on lower molar.",
        patient: {
            id: "1",
            fullName: "Dela Cruz, Juan Mantala",
            gender: "Male",
            dob: "July 5th, 1986",
            maritalStatus: "Married",
            clinic: "Clinic 1",
            address: "123 J. Acosta, Pagsil Laguna",
            email: null,
            phone: null,
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
            },
            {
                name: "Ibuprofen 400mg",
                dosage: "1 tablet every 6 hours as needed for pain",
            },
        ],
    };

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
                    <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800">
                        <Pencil className="h-4 w-4" />
                        Edit
                    </button>

                    <button className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200">
                        <Printer className="h-4 w-4" />
                        Print Prescription
                    </button>
                </div>
            </div>

            <p>
                <span className="font-medium text-white">Patient: </span>

                <button
                    onClick={() => navigate(`/patients/${treatment.patient.id}`)}
                    className="text-blue-400 hover:text-blue-300 hover:underline"
                >
                    {treatment.patient.fullName}
                </button>
            </p>


            {/* Dental Chart */}
            <DentalChartsCard />

            {/* Current Treatment Procedures */}
            <Card title="Current Treatment Procedures">
                <div className="space-y-4">
                    {treatment.procedures.map((proc, index) => (
                        <div
                            key={index}
                            className="rounded-lg border border-white/10 bg-zinc-950 p-4"
                        >
                            <p className="text-sm font-medium text-white">
                                {proc.name}
                            </p>

                            <div className="mt-2 grid gap-2 text-sm text-zinc-300">
                                <p>Tooth: {proc.tooth}</p>
                                <p>Findings: {proc.findings}</p>
                                <p>Cost: ₱{proc.cost.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-4 border-t border-white/10 pt-3 text-right text-sm text-white">
                    Total: ₱{treatment.total.toFixed(2)}
                </div>
            </Card>

            {/* Medical History Snapshot */}
            <MedicalHistoryCard />

            {/* Prescription Section */}
            <Card title="Medical Prescription">
                <div className="space-y-3">
                    {treatment.prescription.map((med, index) => (
                        <div
                            key={index}
                            className="rounded-lg border border-white/10 bg-zinc-950 p-4"
                        >
                            <p className="text-sm font-medium text-white">
                                {med.name}
                            </p>
                            <p className="text-sm text-zinc-400">
                                {med.dosage}
                            </p>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Previous Treatment History */}
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


