import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import PatientForm from "../../components/patients/PatientForm";

const patients = [
  {
    id: "1",
    fullName: "Dela Cruz, Juan Mantala",
    gender: "Male",
    dob: "1986-07-05",
    maritalStatus: "Married",
    clinic: "1",
    address: "123 J. Acosta, Pagsil Laguna",
    email: null,
    phone: null,
    qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://facebook.com/juandelacruz",
    emergencyContacts: [{ id: 1, name: "Maria Dela Cruz", contactNumber: "09171234567", relationship: "Spouse" }],
    allergies: ["None"],
    medicalConditions: ["None"],
    historyNotes: "",
  },
];

export default function EditPatient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const patient = patients.find((p) => p.id === id);

  if (!patient) return null;

  return (
    <div className="max-w-5xl">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <h1 className="text-2xl font-bold text-white">Edit Patient</h1>
      <p className="mb-6 text-sm text-zinc-400">
        Update the information for{" "}
        <span className="text-white font-medium">{patient.fullName}</span>
      </p>

      <PatientForm patient={patient} mode="edit" />
    </div>
  );
}