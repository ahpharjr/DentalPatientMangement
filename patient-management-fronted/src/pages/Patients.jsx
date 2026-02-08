import PageHeader from "../components/ui/PageHeader";
import { Plus, Search, MoreVertical } from "lucide-react";

const patients = [
  {
    id: 1,
    name: "Dela Cruz, Juan M.",
    dob: "Jul 5, 1986",
    gender: "Male",
    email: "—",
    status: "Married",
    clinic: "Clinic 1",
  },
];

export default function Patients() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Patients"
        subtitle="Manage your dental patients and their records"
        action={
          <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800">
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
            type="text"
            placeholder="Search patients by name..."
            className="w-full rounded-lg border border-white/10 bg-zinc-900 py-2 pl-9 pr-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-700"
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
              <th className="px-4 py-3 text-left">Date of Birth</th>
              <th className="px-4 py-3 text-left">Gender</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Status</th>
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
                <td className="px-4 py-3">{p.dob}</td>
                <td className="px-4 py-3">{p.gender}</td>
                <td className="px-4 py-3">{p.email}</td> 
                <td className="px-4 py-3">{p.status}</td>
                <td className="px-4 py-3">{p.clinic}</td>

                <td className="px-4 py-3 text-right">
                  <button className="rounded-md p-1 hover:bg-zinc-800">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
