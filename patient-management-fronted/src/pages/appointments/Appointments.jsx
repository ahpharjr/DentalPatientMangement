import { Plus, Search, RotateCcw, Calendar } from "lucide-react";
import { useState } from "react";
import PageHeader from "../../components/ui/PageHeader";
import { AppointmentActions } from "../../components/ui/AppointmentActions";
import { useNavigate, useSearchParams } from "react-router-dom";

const filters = [
  { key: "scheduled", label: "Scheduled" },
  { key: "today", label: "Today" },
  { key: "next3", label: "Next 3 Days" },
  { key: "done", label: "Done" },
];

const appointmentsData = [
  {
    id: 1,
    patient: "Dela Cruz, Juan",
    scheduledAt: "2025-09-29T09:00",
    cost: 200,
    paymentStatus: "unpaid",
    status: "scheduled",
    procedures: ["Dental Cleaning"],
  },
  {
    id: 2,
    patient: "Santos, Maria",
    scheduledAt: "2025-09-30T14:30",
    cost: 1500,
    paymentStatus: "paid",
    status: "done",
    procedures: ["Tooth Extraction"],
  },
];

export default function Appointments() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const filterFromURL = searchParams.get("filter");

  const isValidFilter = filters.some((f) => f.key === filterFromURL);

  const [activeFilter, setActiveFilter] = useState(
    isValidFilter ? filterFromURL : "scheduled"
  );

  const formatDateTime = (date) => {
    return new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const isToday = (date) => {
    const d = new Date(date);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  };

  const isNext3Days = (date) => {
    const d = new Date(date);
    const today = new Date();
    const diff = (d - today) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 3;
  };

  const [appointments] = useState(appointmentsData);

  const filteredAppointments = appointments.filter((appt) => {
    if (activeFilter === "today") return isToday(appt.scheduledAt);
    if (activeFilter === "next3") return isNext3Days(appt.scheduledAt);
    if (activeFilter === "done") return appt.status === "done";
    return appt.status === "scheduled";
  });

  return (
    <div className="space-y-4">
      {/* Header */}
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
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex rounded-lg border border-white/10 bg-zinc-900 p-1">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => {
                setActiveFilter(f.key);
                setSearchParams({ filter: f.key });
              }}
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
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-2 max-w-md w-full">
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

        <p className="text-sm text-zinc-400 mr-4">
          Total Appointments:{" "}
          <span className="font-semibold text-white">
            {appointments.length}
          </span>
        </p>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-white/10 bg-zinc-900">
        {filteredAppointments.length === 0 ? (
          <div className="flex min-h-55 flex-col items-center justify-center gap-4 text-center">
            <h3 className="text-lg font-medium text-white">
              No Appointments Found
            </h3>
            <p className="text-sm text-zinc-400">
              There are no appointments under this filter.
            </p>
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
                <th className="px-4 py-3 text-left">Cost</th>
                <th className="px-4 py-3 text-left">Payment Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredAppointments.map((appt) => (
                <tr
                  key={appt.id}
                  className="border-b border-white/5 hover:bg-zinc-800/40"
                >
                  <td className="px-4 py-3 text-white">
                    {appt.patient}
                  </td>

                  <td className="px-4 py-3 text-zinc-300">
                    {formatDateTime(appt.scheduledAt)}
                  </td>

                  <td className="px-4 py-3 text-zinc-300">
                    ₱{appt.cost.toFixed(2)}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium
                        ${
                          appt.paymentStatus === "paid"
                            ? "bg-green-500/10 text-green-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                    >
                      {appt.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                    </span>
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
