import PageHeader from "../../components/ui/PageHeader";
import RowActions from "../../components/ui/RowActions";
import { Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { patients } from "../../data/patients";
import { useState } from "react";

export default function Patients() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const filtered = patients.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-4">
      <PageHeader
        title="Patients"
        subtitle="Manage your patients and their records"
        action={
          <button
            onClick={() => navigate("/patients/new")}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Add Patient
          </button>
        }
      />
      <div className="flex justify-between items-center">
        {/* Search */}
        <div className="flex gap-2 max-w-sm w-full">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search patients by ID or name..."
              className="w-full rounded-lg border border-white/10 bg-zinc-900 py-2 pl-9 pr-3 text-sm text-white placeholder-zinc-500"
            />
          </div>
        </div>

        <p className="text-sm text-zinc-400 mr-4">
          Total Patients:{" "}
          <span className="font-semibold text-white">
            {filtered.length}
            {query && <span className="text-zinc-500"> of {patients.length}</span>}
          </span>
        </p>
      </div>

      {/* Table */}
      <div className="overflow-visible rounded-lg border border-white/10">
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
            {filtered.length > 0 ? (
              filtered.map((p) => (
                <tr
                  key={p.id}
                  className="border-t border-white/10 hover:bg-zinc-900/50"
                >
                  <td className="px-2 py-2">
                    <span className="text-white">{p.name}</span>
                    <p className="text-xs text-zinc-500">#{p.id}</p>
                  </td>
                  <td className="px-2 py-2">{p.age}</td>
                  <td className="px-2 py-2">{p.gender}</td>
                  <td className="px-2 py-2">{p.email}</td>
                  <td className="px-2 py-2">{p.clinic}</td>
                  <td className="px-2 py-2 text-right">
                    <RowActions
                      onView={() => navigate(`/patients/${p.id}`)}
                      onEdit={() => navigate(`/patients/${p.id}/edit`)}
                      onDelete={() => alert("Delete patient")}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-sm text-zinc-500">
                  No patients found matching <span className="text-zinc-300">"{query}"</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}