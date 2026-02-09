import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Phone, Mail } from "lucide-react";
import Card from "../components/ui/Card";

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
  },
];

export default function PatientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const patient = patients.find((p) => p.id === id);

  if (!patient) {
    return <p className="text-zinc-400">Patient not found</p>;
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate("/patients")}
        className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Patients
      </button>

      <div>
        <h1 className="text-2xl font-bold text-white">{patient.fullName}</h1>
        <p className="text-zinc-400">Patient details and information</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <h3 className="mb-4 font-medium text-white">Personal Information</h3>
          <div className="space-y-2 text-sm text-zinc-300">
            <p><span className="text-zinc-400">Gender:</span> {patient.gender}</p>
            <p><span className="text-zinc-400">Date of Birth:</span> {patient.dob}</p>
            <p><span className="text-zinc-400">Marital Status:</span> {patient.maritalStatus}</p>
            <p><span className="text-zinc-400">Clinic:</span> {patient.clinic}</p>
          </div>
        </Card>

        <Card>
          <h3 className="mb-4 font-medium text-white">Contact Information</h3>
          <div className="space-y-3 text-sm text-zinc-300">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 text-zinc-400" />
              <p>{patient.address}</p>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-zinc-400" />
              <p>{patient.email || "Not provided"}</p>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-zinc-400" />
              <p>{patient.phone || "Not provided"}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
