import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Phone, Mail, Building2, Pencil, Trash2 } from "lucide-react";
import Card from "../../components/ui/Card";
import ClinicStatusBadge from "../../components/clinics/ClinicStatusBadge";
import { useState } from "react";

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

  const [clinicState, setClinicState] = useState(
    clinics.find((c) => c.id === id)
  );

  if (!clinicState) {
    return <p className="text-zinc-400">Clinic not found</p>;
  }

  const toggleStatus = () => {
    setClinicState((prev) => ({
      ...prev,
      status: prev.status === "Active" ? "Inactive" : "Active",
    }));
  };

  const handleDelete = () => {
    // replace with real API call later
    alert("Clinic deleted");
    navigate("/clinics");
  };

  return (
    <div className="space-y-6">

      {/* Back */}
      <button
        onClick={() => navigate("/clinics")}
        className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Clinics
      </button>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">
              {clinicState.name}
            </h1>
            <ClinicStatusBadge status={clinicState.status} />
          </div>
          <p className="text-zinc-400">
            Clinic details and information
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">

          {/* Edit */}
          <button
            onClick={() => navigate(`/clinics/${id}/edit`)}
            className="flex items-center gap-2 rounded-lg border cursor-pointer border-white/10 bg-zinc-800 px-4 py-2 text-sm text-white hover:bg-zinc-700"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </button>

          {/* Delete */}
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 rounded-lg border cursor-pointer border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400 hover:bg-red-500/20 hover:border-red-500"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>

        </div>
      </div>

      {/* Info Card */}
      <Card>
        <div className="space-y-4 text-sm text-zinc-300">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <Building2 className="mt-0.5 h-4 w-4 text-zinc-400" />
              <p>{clinicState.name}</p>
            </div>

            {/* Modern Toggle Switch */}
            <button
              onClick={toggleStatus}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 cursor-pointer

      ${clinicState.status === "Active"
                  ? "bg-green-500"
                  : "bg-zinc-600"
                }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300
        ${clinicState.status === "Active"
                    ? "translate-x-6"
                    : "translate-x-1"
                  }`}
              />
            </button>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 text-zinc-400" />
            <p>{clinicState.address}</p>
          </div>

          {clinicState.phone && (
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-zinc-400" />
              <p>{clinicState.phone}</p>
            </div>
          )}

          {clinicState.email && (
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-zinc-400" />
              <p>{clinicState.email}</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
