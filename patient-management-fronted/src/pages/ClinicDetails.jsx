import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Phone, Mail, Building2 } from "lucide-react";
import Card from "../components/ui/Card";
import ClinicStatusBadge from "../components/clinics/ClinicStatusBadge";

const clinics = [
  {
    id: "1",
    name: "Clinic 1",
    status: "Active",
    address: "292 Cabcede Street, Talavera, Pakil, Laguna 4017",
    phone: "09123456789",
    email: "clinic1@email.com",
  },
  {
    id: "2",
    name: "Clinic 2",
    status: "Active",
    address: "232 Cabcede Street, Talavera, Pakil, Laguna 4017",
    phone: "09123456789",
    email: "clinic2@email.com",
  },
];

export default function ClinicDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const clinic = clinics.find((c) => c.id === id);

  if (!clinic) {
    return <p className="text-zinc-400">Clinic not found</p>;
  }

  return (
    <div className="space-y-6">
      {/* Back */}
      <button
        onClick={() => navigate("/clinics")}
        className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Clinics
      </button>

      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-white">
            {clinic.name}
          </h1>
          <ClinicStatusBadge status={clinic.status} />
        </div>
        <p className="text-zinc-400">Clinic details and information</p>
      </div>

      {/* Info Card */}
      <Card>
        <div className="space-y-4 text-sm text-zinc-300">
          <div className="flex items-start gap-3">
            <Building2 className="mt-0.5 h-4 w-4 text-zinc-400" />
            <p>{clinic.name}</p>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 text-zinc-400" />
            <p>{clinic.address}</p>
          </div>

          {clinic.phone && (
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-zinc-400" />
              <p>{clinic.phone}</p>
            </div>
          )}

          {clinic.email && (
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-zinc-400" />
              <p>{clinic.email}</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
