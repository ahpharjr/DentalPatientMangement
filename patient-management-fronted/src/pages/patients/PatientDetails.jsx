import { ArrowLeft, Pencil } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import TreatmentHistoryCard from "../../components/patients/TreatmentHistoryCard";
import PersonalInfoCard from "../../components/patients/PersonalInfoCard";
import ContactInfoCard from "../../components/patients/ContactInfoCard";
import MedicalHistoryCard from "../../components/patients/MedicalHistoryCard";
import DentalChartsCard from "../../components/patients/DentalChartsCard";

const patients = [
  {
    id: "1",
    fullName: "Dela Cruz, Juan Mantala",
    gender: "Male",
    dob: "July 5th, 1986",
    maritalStatus: "Married",
    clinic: "Clinic 1",
    address: "123 J. Acosta, Pagsil Laguna",
    email: null,
    phone: null,
    qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://facebook.com/juandelacruz"
  },
];

export default function PatientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const patient = patients.find((p) => p.id === id);

  if (!patient) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="mb-2 flex items-center gap-1 text-sm text-zinc-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back 
          </button>

          <h1 className="text-2xl font-semibold text-white">
            {patient.fullName}
          </h1>
          <p className="text-sm text-zinc-400">
            Patient details and information
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800">
          <Pencil className="h-4 w-4" />
          Edit Patient
        </button>
      </div>

      {/* Info Sections */}
      <div className="grid gap-6 md:grid-cols-2">
        <PersonalInfoCard patient={patient} />
        <ContactInfoCard patient={patient} />
      </div>

      <DentalChartsCard />

      <MedicalHistoryCard />
      <TreatmentHistoryCard />
    </div>
  );
}
