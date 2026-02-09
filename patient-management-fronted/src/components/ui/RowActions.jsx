import { useState, useRef, useEffect } from "react";
import { MoreVertical, Eye, Pencil, Trash2 } from "lucide-react";

export default function RowActions({ onView, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="rounded-md p-1 hover:bg-zinc-800"
      >
        <MoreVertical className="h-4 w-4 text-zinc-300" />
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-44 rounded-lg border border-white/10 bg-zinc-900 shadow-lg">
          <button
            onClick={onView}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-white hover:bg-zinc-800"
          >
            <Eye className="h-4 w-4" />
            View Details
          </button>

          <button
            onClick={onEdit}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-white hover:bg-zinc-800"
          >
            <Pencil className="h-4 w-4" />
            Edit Patient
          </button>

          <button
            onClick={onDelete}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10"
          >
            <Trash2 className="h-4 w-4" />
            Delete Patient
          </button>
        </div>
      )}
    </div>
  );
}
