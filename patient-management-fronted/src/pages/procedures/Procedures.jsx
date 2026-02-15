import PageHeader from "../../components/ui/PageHeader";
import RowActions from "../../components/ui/RowActions";
import { Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const procedures = [
  {
    id: "1",
    name: "Dental cleaning",
    description: "This is a dental cleaning basic",
  },
  {
    id: "2",
    name: "Dental cleaning",
    description: "This is a dental cleaning basic",
  },
  {
    id: "3",
    name: "Dental cleaning",
    description: "This is a dental cleaning basic",
  },
];

export default function Procedures() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <PageHeader
        title="Procedures"
        subtitle="Manage your dental procedures and treatments"
        action={
          <button
            onClick={() => navigate("/procedures/new")}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800"
          >
            <Plus className="h-4 w-4" />
            Add Procedure
          </button>
        }
      />

      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex gap-2 max-w-sm w-full">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
            <input
              placeholder="Search procedures by name or description..."
              className="w-full rounded-lg border border-white/10 bg-zinc-900 py-2 pl-9 pr-3 text-sm text-white placeholder-zinc-500"
            />
          </div>

          <button className="rounded-lg bg-zinc-800 px-4 text-sm text-white hover:bg-zinc-700">
            Search
          </button>
        </div>

        <p className="text-sm text-zinc-400 mr-4">
          Total Procedures: <span className="font-semibold text-white">{procedures.length}</span>
        </p>
      </div>



      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900 text-zinc-400">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {procedures.map((procedure) => (
              <tr
                key={procedure.id}
                className="border-t border-white/10 hover:bg-zinc-900/50"
              >
                <td className="px-4 py-3 text-white">
                  {procedure.name}
                </td>

                <td className="px-4 py-3 text-zinc-300">
                  {procedure.description}
                </td>

                <td className="px-4 py-3 text-right">
                  <RowActions
                    onView={() =>
                      navigate(`/procedures/${procedure.id}`)
                    }
                    onEdit={() =>
                      navigate(`/procedures/${procedure.id}/edit`)
                    }
                    onDelete={() =>
                      alert("Delete procedure")
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {procedures.length === 0 && (
          <div className="p-6 text-center text-sm text-zinc-500">
            No procedures found
          </div>
        )}
      </div>
    </div>
  );
}
