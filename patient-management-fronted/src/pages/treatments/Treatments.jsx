import { Plus, Search, RotateCcw, Activity } from "lucide-react";
import { useState } from "react";
import PageHeader from "../../components/ui/PageHeader";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const filters = [
  { key: "ongoing", label: "Ongoing" },
  { key: "today", label: "Today" },
  { key: "completed", label: "Completed" },
];

const treatmentsData = [
  {
    id: 1,
    patient: "Dela Cruz, Juan",
    date: "2025-09-29T09:00",
    total: 200,
    paymentStatus: "unpaid",
    status: "ongoing",
  },
  {
    id: 2,
    patient: "Santos, Maria",
    date: "2025-09-30T14:30",
    total: 1500,
    paymentStatus: "paid",
    status: "completed",
  },
];

export default function Treatments() {
  // const [activeFilter, setActiveFilter] = useState("ongoing");
  const [treatments] = useState(treatmentsData);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialFilter = searchParams.get("filter") || "ongoing";
  const [activeFilter, setActiveFilter] = useState(initialFilter);


  const formatDate = (date) =>
    new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const filteredTreatments = treatments.filter((t) => {
    if (activeFilter === "completed") return t.status === "completed";
    if (activeFilter === "today")
      return new Date(t.date).toDateString() === new Date().toDateString();
    return t.status === "ongoing";
  });

  return (
    <div className="space-y-4">
      <PageHeader
        title="Treatments"
        subtitle="Manage patient treatments and walk-in records"
        action={
          <button
            onClick={() => navigate("/treatments/new")}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800"
          >
            <Plus className="h-4 w-4" />
            New Treatment
          </button>
        }
      />

      <div className="flex justify-between items-center">
        {/* Filters */}
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`rounded-lg px-3 py-1.5 text-sm transition
              ${activeFilter === f.key
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-white"
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <p className="text-sm text-zinc-400 mr-4">
          Total Treatments: <span className="font-semibold text-white">{treatments.length}</span>
        </p>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-white/10 bg-zinc-900">
        {filteredTreatments.length === 0 ? (
          <div className="flex min-h-40 flex-col items-center justify-center gap-3 text-center">
            <Activity className="h-6 w-6 text-zinc-500" />
            <p className="text-sm text-zinc-400">
              No treatments found.
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-white/10 text-zinc-400">
              <tr>
                <th className="px-4 py-3 text-left">Patient</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Total</th>
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
                  <td className="px-4 py-3 text-zinc-300">
                    {formatDate(t.date)}
                  </td>
                  <td className="px-4 py-3 text-zinc-300">
                    ₱{t.total.toFixed(2)}
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
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => navigate(`/treatments/${t.id}`)}
                      className="text-sm text-blue-400 hover:text-blue-300"
                    >
                      View
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
