import PageHeader from "../../components/ui/PageHeader";
import ClinicCard from "../../components/clinics/ClinicCard";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Clinics() {
  const navigate = useNavigate();

  const [clinics, setClinics] = useState([
    {
      id: 1,
      name: "Clinic 1",
      status: "Active",
      address: "292 Cabcede Street, Talavera, Pakil, Laguna 4017",
    },
    {
      id: 2,
      name: "Clinic 2",
      status: "Active",
      address: "232 Cabcede Street, Talavera, Pakil, Laguna 4017",
      phone: "09123456789",
    },
  ]);

  const handleDelete = (id) => {
    setClinics((prev) => prev.filter((clinic) => clinic.id !== id));
  };

  const handleToggleStatus = (id) => {
    setClinics((prev) =>
      prev.map((clinic) =>
        clinic.id === id
          ? {
              ...clinic,
              status: clinic.status === "Active" ? "Inactive" : "Active",
            }
          : clinic
      )
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Clinics"
        subtitle="Manage your dental clinics across various locations"
        action={
          <button
            onClick={() => navigate("/clinics/new")}
            className="flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 text-white hover:bg-zinc-700"
          >
            <Plus className="h-4 w-4" />
            Add Clinic
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {clinics.map((clinic) => (
          <ClinicCard
            key={clinic.id}
            clinic={clinic}
            onEdit={() => navigate(`/clinics/${clinic.id}/edit`)}
            onDelete={() => handleDelete(clinic.id)}
            onToggle={() => handleToggleStatus(clinic.id)}
          />
        ))}
      </div>
    </div>
  );
}
