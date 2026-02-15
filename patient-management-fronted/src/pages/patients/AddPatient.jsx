import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import PatientForm from "../../components/patients/PatientForm";

export default function AddPatient() {
  return (
    <div className="max-w-5xl">
      <Link
        to="/patients"
        className="mb-4 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Patients
      </Link>

      <h1 className="text-2xl font-bold text-white">
        Add New Patient
      </h1>
      <p className="mb-6 text-sm text-zinc-400">
        Add a new patient to your dental clinic
      </p>

      <PatientForm />
    </div>
  );
}
