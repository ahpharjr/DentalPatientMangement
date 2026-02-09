import { Eye, Pencil, CheckCircle, Trash2, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function AppointmentActions({ id }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-md p-1 text-zinc-400 hover:bg-zinc-700 hover:text-white"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-2 w-48 rounded-lg border border-white/10 bg-zinc-900 shadow-lg">
          <button
            onClick={() => navigate(`/appointments/${id}`)}
            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-white hover:bg-zinc-800"
          >
            <Eye className="h-4 w-4" />
            View Details
          </button>

          <button
            onClick={() => navigate(`/appointments/${id}/edit`)}
            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-white hover:bg-zinc-800"
          >
            <Pencil className="h-4 w-4" />
            Edit Appointment
          </button>

          <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-white hover:bg-zinc-800">
            <CheckCircle className="h-4 w-4" />
            Mark as Done
          </button>

          <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10">
            <Trash2 className="h-4 w-4" />
            Delete Appointment
          </button>
        </div>
      )}
    </div>
  );
}
