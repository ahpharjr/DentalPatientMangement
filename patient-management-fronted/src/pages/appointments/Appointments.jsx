import { Plus, Search, RotateCcw, Calendar } from "lucide-react";
import { useState } from "react";
import PageHeader from "../../components/ui/PageHeader";
import { AppointmentActions } from "../../components/ui/AppointmentActions";
import { useNavigate, useSearchParams } from "react-router-dom";
import { appointments as appointmentsData } from "../../data/appointments";
import { patients } from "../../data/patients";

const filters = [
  { key: "scheduled", label: "Scheduled" },
  { key: "today", label: "Today" },
  { key: "next3", label: "Next 3 Days" },
  { key: "done", label: "Done" },
];

// Join appointments with patient records
const enrichedAppointments = appointmentsData.map((appt) => ({
  ...appt,
  patient: patients.find((p) => p.id === appt.patientId) ?? null,
}));

export default function Appointments() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const filterFromURL = searchParams.get("filter");
  const isValidFilter = filters.some((f) => f.key === filterFromURL);
  const [activeFilter, setActiveFilter] = useState(isValidFilter ? filterFromURL : "scheduled");
  const [query, setQuery] = useState("");
  const [appointments] = useState(enrichedAppointments);

  const isToday = (date) => new Date(date).toDateString() === new Date().toDateString();

  const isNext3Days = (date) => {
    const diff = (new Date(date) - new Date()) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 3;
  };

  const formatDateTime = (date, time) =>
    new Date(`${date} ${time}`).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  const filteredAppointments = appointments.filter((appt) => {
    const matchesFilter =
      activeFilter === "today" ? isToday(appt.date) :
      activeFilter === "next3" ? isNext3Days(appt.date) :
      activeFilter === "done" ? appt.status === "done" :
      appt.status !== "done";

    const q = query.toLowerCase();
    const matchesSearch =
      !q ||
      appt.patient?.name?.toLowerCase().includes(q) ||
      appt.procedures[0]?.procedure?.toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-4">
      <PageHeader
        title="Appointments"
        subtitle="Manage your dental appointments and patient records"
        action={
          <button
            onClick={() => navigate("/appointments/new")}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800"
          >
            <Plus className="h-4 w-4" />
            Add Appointment
          </button>
        }
      />

      {/* Filters */}
      <div className="flex rounded-lg border border-white/10 bg-zinc-900 p-1 w-fit">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => {
              setActiveFilter(f.key);
              setSearchParams({ filter: f.key });
            }}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition
              ${activeFilter === f.key ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"}`}
          >
            <Calendar className="h-4 w-4" />
            {f.label}
          </button>
        ))}
      </div>

      {/* Search + count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-md w-full">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by patient or procedure..."
              className="w-full rounded-lg border border-white/10 bg-zinc-900 py-2 pl-9 pr-3 text-sm text-white placeholder-zinc-500"
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white hover:bg-zinc-800">
            <RotateCcw className="h-4 w-4" />
            Refresh
          </button>
        </div>

        <p className="text-sm text-zinc-400 mr-4">
          Total Appointments:{" "}
          <span className="font-semibold text-white">
            {filteredAppointments.length}
            {query && <span className="text-zinc-500"> of {appointments.length}</span>}
          </span>
        </p>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-white/10 bg-zinc-900">
        {filteredAppointments.length === 0 ? (
          <div className="flex min-h-55 flex-col items-center justify-center gap-4 text-center">
            <h3 className="text-lg font-medium text-white">No Appointments Found</h3>
            <p className="text-sm text-zinc-400">There are no appointments under this filter.</p>
            <button
              onClick={() => navigate("/appointments/new")}
              className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200"
            >
              Schedule an Appointment
            </button>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-white/10 text-zinc-400">
              <tr>
                <th className="px-4 py-3 text-left">Patient</th>
                <th className="px-4 py-3 text-left">Scheduled</th>
                <th className="px-4 py-3 text-left">Procedure</th>
                <th className="px-4 py-3 text-left">Contact No.</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appt) => (
                <tr key={appt.id} className="border-b border-white/5 hover:bg-zinc-800/40">
                  <td className="px-4 py-3">
                    <span className="text-white">{appt.patient?.name ?? "Unknown Patient"}</span>
                    <p className="text-xs text-zinc-500">#{appt.patientId}</p>
                  </td>
                  <td className="px-4 py-3 text-zinc-300">
                    {formatDateTime(appt.date, appt.time)}
                  </td>
                  <td className="px-4 py-3 text-zinc-300">
                    {appt.procedures[0]?.procedure ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-zinc-300">
                    {appt.patient?.phone ?? "Not provided"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <AppointmentActions id={appt.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}