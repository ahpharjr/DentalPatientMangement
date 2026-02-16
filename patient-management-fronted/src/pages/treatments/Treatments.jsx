import { Plus, Calendar, Activity } from "lucide-react";
import { useState } from "react";
import PageHeader from "../../components/ui/PageHeader";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const filters = [
  { key: "ongoing", label: "Ongoing" },
  { key: "today", label: "Today" },
  { key: "completed", label: "Completed" },
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
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            New Treatment
          </button>
        }
      />

      <div className="flex justify-between items-center">
        {/* Filters */}
        <div className="flex rounded-lg border border-white/10 bg-zinc-900 p-1">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition cursor-pointer
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
                <th className="px-4 py-3 text-left">Procedure</th>
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
                    {t.procedure}
                  </td>
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
                      className="text-sm text-blue-400 hover:text-blue-300 cursor-pointer"
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

const treatmentsData = [
  {
    id: 1,
    patient: "Santos, Maria L.",
    procedure: "Dental Cleaning",
    date: "2026-02-16T09:00",
    total: 1200,
    paymentStatus: "paid",
    status: "completed",
  },
  {
    id: 2,
    patient: "Reyes, Carlo P.",
    procedure: "Root Canal Treatment",
    date: "2026-02-17T10:30",
    total: 3500,
    paymentStatus: "unpaid",
    status: "ongoing",
  },
  {
    id: 3,
    patient: "Garcia, Angela M.",
    procedure: "Dental Filling (Composite)",
    date: "2026-02-18T14:00",
    total: 800,
    paymentStatus: "paid",
    status: "ongoing",
  },
  {
    id: 4,
    patient: "Torres, Michael A.",
    procedure: "Dental Implant Surgery",
    date: "2026-02-19T11:15",
    total: 18000,
    paymentStatus: "unpaid",
    status: "ongoing",
  },
  {
    id: 5,
    patient: "Villanueva, Sophia R.",
    procedure: "Tooth Extraction",
    date: "2026-02-20T16:00",
    total: 2500,
    paymentStatus: "paid",
    status: "completed",
  },
  {
    id: 6,
    patient: "Lim, Daniel K.",
    procedure: "Dental Crown Placement",
    date: "2026-02-21T09:45",
    total: 5000,
    paymentStatus: "unpaid",
    status: "ongoing",
  },
  {
    id: 7,
    patient: "Chua, Isabella T.",
    procedure: "Orthodontic Braces Installation",
    date: "2026-02-22T13:30",
    total: 6000,
    paymentStatus: "paid",
    status: "ongoing",
  },
  {
    id: 8,
    patient: "Tan, Joshua C.",
    procedure: "Teeth Whitening",
    date: "2026-02-23T08:30",
    total: 2800,
    paymentStatus: "paid",
    status: "completed",
  },
  {
    id: 9,
    patient: "Lopez, Camille D.",
    procedure: "Dental Cleaning",
    date: "2026-02-24T15:00",
    total: 1200,
    paymentStatus: "unpaid",
    status: "ongoing",
  },
  {
    id: 10,
    patient: "Fernandez, Mark J.",
    procedure: "Root Canal Treatment",
    date: "2026-02-25T10:00",
    total: 4000,
    paymentStatus: "paid",
    status: "completed",
  },
  {
    id: 11,
    patient: "Cruz, Andrea P.",
    procedure: "Dental Filling (Composite)",
    date: "2026-02-26T09:30",
    total: 950,
    paymentStatus: "paid",
    status: "ongoing",
  },
  {
    id: 12,
    patient: "Navarro, Kevin R.",
    procedure: "Dental Implant Surgery",
    date: "2026-02-27T14:15",
    total: 18500,
    paymentStatus: "unpaid",
    status: "ongoing",
  },
  {
    id: 13,
    patient: "Gonzales, Patricia M.",
    procedure: "Dental Crown Placement",
    date: "2026-02-28T11:45",
    total: 3200,
    paymentStatus: "paid",
    status: "completed",
  },
  {
    id: 14,
    patient: "Sy, Benjamin T.",
    procedure: "Tooth Extraction",
    date: "2026-03-01T13:00",
    total: 2200,
    paymentStatus: "unpaid",
    status: "ongoing",
  },
  {
    id: 15,
    patient: "Aquino, Hannah L.",
    procedure: "Orthodontic Braces Installation",
    date: "2026-03-02T16:30",
    total: 5500,
    paymentStatus: "paid",
    status: "ongoing",
  },
  {
    id: 16,
    patient: "Ramos, Elijah D.",
    procedure: "Teeth Whitening",
    date: "2026-03-03T09:00",
    total: 3000,
    paymentStatus: "paid",
    status: "completed",
  },
  {
    id: 17,
    patient: "Mendoza, Claire A.",
    procedure: "Dental Cleaning",
    date: "2026-03-04T10:15",
    total: 1200,
    paymentStatus: "unpaid",
    status: "ongoing",
  },
  {
    id: 18,
    patient: "Castillo, John M.",
    procedure: "Root Canal Treatment",
    date: "2026-03-05T14:30",
    total: 3800,
    paymentStatus: "paid",
    status: "completed",
  },
  {
    id: 19,
    patient: "Del Rosario, Nina P.",
    procedure: "Dental Filling (Composite)",
    date: "2026-03-06T11:00",
    total: 900,
    paymentStatus: "unpaid",
    status: "ongoing",
  },
  {
    id: 20,
    patient: "Herrera, Lucas T.",
    procedure: "Dental Implant Surgery",
    date: "2026-03-07T15:45",
    total: 20000,
    paymentStatus: "paid",
    status: "completed",
  },
];
