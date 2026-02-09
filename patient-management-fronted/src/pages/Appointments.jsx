import { Plus, Search, RotateCcw, Calendar } from "lucide-react";
import { useState } from "react";
import PageHeader from "../components/ui/PageHeader";

const filters = [
  { key: "scheduled", label: "Scheduled" },
  { key: "today", label: "Today" },
  { key: "next3", label: "Next 3 Days" },
  { key: "done", label: "Done" },
];

export default function Appointments() {
  const [activeFilter, setActiveFilter] = useState("scheduled");

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Appointments"
        subtitle="Manage your dental appointments and patient records"
        action={
          <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800">
            <Plus className="h-4 w-4" />
            Add Appointment
          </button>
        }
      />

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex rounded-lg border border-white/10 bg-zinc-900 p-1">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition
                ${
                  activeFilter === f.key
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
            >
              <Calendar className="h-4 w-4" />
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search + Actions */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <input
            placeholder="Search appointments by patient or procedure..."
            className="w-full rounded-lg border border-white/10 bg-zinc-900 py-2 pl-9 pr-3 text-sm text-white placeholder-zinc-500"
          />
        </div>

        <button className="rounded-lg bg-zinc-800 px-4 py-2 text-sm text-white hover:bg-zinc-700">
          Search
        </button>

        <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white hover:bg-zinc-800">
          <RotateCcw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {/* Empty State */}
      <div className="flex min-h-55 flex-col items-center justify-center gap-4 rounded-lg border border-white/10 bg-zinc-900 text-center">
        <h3 className="text-lg font-medium text-white">
          No Scheduled Appointments
        </h3>
        <p className="text-sm text-zinc-400">
          You don't have any upcoming appointments scheduled.
        </p>

        <button className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200">
          Schedule an Appointment
        </button>
      </div>
    </div>
  );
}
