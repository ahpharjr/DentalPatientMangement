import PageHeader from "../../components/ui/PageHeader";
import RowActions from "../../components/ui/RowActions";
import { Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const patients = [
  {
    id: "1",
    name: "Dela Cruz, Juan M.",
    age: "38",
    gender: "Male",
    email: "—",
    status: "Married",
    clinic: "Clinic 1",
  },
    {
    id: "2",
    name: "Dela Cruz, Juan M.",
    age: "42",
    gender: "Male",
    email: "—",
    status: "Married",
    clinic: "Clinic 1",
  },
    {
    id: "3",
    name: "Dela Cruz, Juan M.",
    age: "50",
    gender: "Male",
    email: "—",
    status: "Married",
    clinic: "Clinic 1",
  },
    {
    id: "4",
    name: "Dela Cruz, Juan M.",
    age: "38",
    gender: "Male",
    email: "—",
    status: "Married",
    clinic: "Clinic 1",
  },
];

export default function Patients() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Patients"
        subtitle="Manage your patients and their records"
        action={
          <button
            onClick={() => navigate("/patients/new")}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800"
          >
            <Plus className="h-4 w-4" />
            Add Patient
          </button>
        }
      />

      {/* Search */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <input
            placeholder="Search patients by name..."
            className="w-full rounded-lg border border-white/10 bg-zinc-900 py-2 pl-9 pr-3 text-sm text-white placeholder-zinc-500"
          />
        </div>
        <button className="rounded-lg bg-zinc-800 px-4 text-sm text-white hover:bg-zinc-700">
          Search
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900 text-zinc-400">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Age</th>
              <th className="px-4 py-3 text-left">Gender</th>
              <th className="px-4 py-3 text-left">Contact</th>
              <th className="px-4 py-3 text-left">Clinic</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((p) => (
              <tr
                key={p.id}
                className="border-t border-white/10 hover:bg-zinc-900/50"
              >
                <td className="px-4 py-3 text-white">{p.name}</td>
                <td className="px-4 py-3">{p.age}</td>
                <td className="px-4 py-3">{p.gender}</td>
                <td className="px-4 py-3">{p.email}</td>
                <td className="px-4 py-3">{p.clinic}</td>

                <td className="px-4 py-3 text-right">
                  <RowActions
                    onView={() => navigate(`/patients/${p.id}`)}
                    onEdit={() => navigate(`/patients/${p.id}/edit`)}
                    onDelete={() => alert("Delete patient")}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
