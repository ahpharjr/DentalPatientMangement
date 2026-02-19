import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import PatientForm from "../../components/patients/PatientForm";
import { patients } from "../../data/patients";

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