import { MapPin, Phone, Building2 } from "lucide-react";
import Card from "../ui/Card";
import ClinicStatusBadge from "./ClinicStatusBadge";
import { useNavigate } from "react-router-dom";

export default function ClinicCard({ clinic }) {
  const navigate = useNavigate();

  return (
    <Card className="flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-zinc-400" />
          <p className="font-medium text-white">{clinic.name}</p>
          <ClinicStatusBadge status={clinic.status} />
        </div>

        {/* <button className="text-zinc-400 hover:text-white">
          <MoreVertical className="h-4 w-4" />
        </button> */}
      </div>

      {/* Body */}
      <div className="mt-4 space-y-2 text-sm text-zinc-400">
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 mt-0.5" />
          <p>{clinic.address}</p>
        </div>

        {clinic.phone && (
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <p>{clinic.phone}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <button 
        onClick={() => navigate(`/clinics/${clinic.id}`)}
        className="mt-4 w-full rounded-lg border border-white/10 bg-zinc-800 py-2 text-sm text-white hover:bg-zinc-700 cursor-pointer">
        View Clinic Details
      </button>
    </Card>
  );
}
