import { Search, RotateCcw, Calendar, ClipboardCheck, Eye } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";

const filters = [
  { key: "today", label: "Today" },
  { key: "yesterday", label: "Yesterday" },
  { key: "all", label: "All" },
];

const treatmentData = [
  {
    id: 1,
    patient: "Santos, Maria",
    procedure: "Tooth Extraction",
    clinic: "Mong Yang Clinic",
    completedAt: new Date(),
    cost: 1500,
    paymentStatus: "paid",
  },
  {
    id: 2,
    patient: "Dela Cruz, Juan",
    procedure: "Dental Cleaning",
    clinic: "Mong Yang Clinic",
    completedAt: new Date(Date.now() - 86400000),
    cost: 500,
    paymentStatus: "unpaid",
  },
];

export default function TreatmentHistory() {
  const [activeFilter, setActiveFilter] = useState("today");
  const [treatments] = useState(treatmentData);
  const navigate = useNavigate();

  const formatDateTime = (date) =>
    new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  const isToday = (date) =>
    new Date(date).toDateString() === new Date().toDateString();

  const isYesterday = (date) => {
    const d = new Date(date);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return d.toDateString() === yesterday.toDateString();
  };

  const filteredTreatments = treatments.filter((t) => {
    if (activeFilter === "today") return isToday(t.completedAt);
    if (activeFilter === "yesterday") return isYesterday(t.completedAt);
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <PageHeader
        title="Treatment History"
        subtitle="View completed dental treatments and billing records"
        icon={<ClipboardCheck className="h-5 w-5 text-zinc-400" />}
      />

      {/* Filters */}
      <div className="flex rounded-lg border border-white/10 bg-zinc-900 p-1 w-fit">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition
              ${activeFilter === f.key
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:text-white"
              }`}
          >
            <Calendar className="h-4 w-4" />
            {f.label}
          </button>
        ))}
      </div>


      <div className="flex justify-between items-center">
        {/* Search */}
        <div className="flex gap-2 max-w-md w-full">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
            <input
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
          Total Treatments: <span className="font-semibold text-white">{treatments.length}</span>
        </p>
      </div>


      {/* Table */}
      <div className="rounded-lg border border-white/10 bg-zinc-900">
        {filteredTreatments.length === 0 ? (
          <div className="flex min-h-55 flex-col items-center justify-center gap-2 text-center">
            <h3 className="text-lg font-medium text-white">
              No Treatment Records
            </h3>
            <p className="text-sm text-zinc-400">
              No completed treatments found for this period.
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-white/10 text-zinc-400">
              <tr>
                <th className="px-4 py-3 text-left">Patient</th>
                <th className="px-4 py-3 text-left">Procedure</th>
                <th className="px-4 py-3 text-left">Clinic</th>
                <th className="px-4 py-3 text-left">Completed At</th>
                <th className="px-4 py-3 text-left">Cost</th>
                <th className="px-4 py-3 text-left">Payment</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTreatments.map((t) => (
                <tr
                  key={t.id}
                  className="border-b border-white/5 hover:bg-zinc-800/40"
                >
                  <td className="px-4 py-3 text-white">{t.patient}</td>
                  <td className="px-4 py-3 text-zinc-300">{t.procedure}</td>
                  <td className="px-4 py-3 text-zinc-300">{t.clinic}</td>
                  <td className="px-4 py-3 text-zinc-300">
                    {formatDateTime(t.completedAt)}
                  </td>
                  <td className="px-4 py-3 text-zinc-300">
                    ₱{t.cost.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium
                        ${t.paymentStatus === "paid"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-red-500/10 text-red-400"
                        }`}
                    >
                      {t.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                    </span>
                  </td>

                  {/* 👁 View Action */}
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => navigate(`/treatments/history/${t.id}`)}
                      className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-zinc-400 hover:bg-zinc-800 hover:text-white cursor-pointer"
                      title="View treatment details"
                    >
                      View
                      {/* <Eye className="h-4 w-4" /> */}
                    </button>
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
