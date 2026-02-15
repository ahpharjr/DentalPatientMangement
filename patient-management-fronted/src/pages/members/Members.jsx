import PageHeader from "../../components/ui/PageHeader";
import { Plus, Search, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const members = [
  {
    id: "1",
    name: "Dr. Maria Santos",
    role: "Dentist",
    email: "maria@clinic.com",
    phone: "09123456789",
    clinic: "Clinic 1",
  },
  {
    id: "2",
    name: "John Rivera",
    role: "Dental Assistant",
    email: "john@clinic.com",
    phone: "09987654321",
    clinic: "Clinic 1",
  },
];

export default function Members() {
  const navigate = useNavigate();

  const getRoleBadge = (role) => {
    if (role === "Dentist")
      return "bg-blue-500/20 text-blue-400";
    if (role === "Dental Assistant")
      return "bg-purple-500/20 text-purple-400";
    return "bg-zinc-700 text-zinc-300";
  };

  return (
    <div className="space-y-4">

      {/* Header */}
      <PageHeader
        title="Members"
        subtitle="Clinic staff and team members"
        action={
          <button
            onClick={() => navigate("/members/new")}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-lg hover:bg-blue-500 transition"
          >
            <Plus className="h-4 w-4" />
            Add Member
          </button>
        }
      />
      <div className="flex justify-between items-center">
      {/* Search Bar */}
      <div className="relative max-w-sm w-full">
        <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
        <input
          placeholder="Search members..."
          className="w-full rounded-lg border border-white/10 bg-zinc-900 py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <p className="text-sm text-zinc-400 mr-4">
        Total Members: <span className="font-semibold text-white">{members.length}</span>
      </p>
</div>

      {/* Modern Table Card */}
      <div className="rounded-lg border border-white/10 bg-zinc-950 shadow-xl overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-zinc-900 text-zinc-400">
            <tr>
              <th className="px-6 py-3 text-left font-medium">Member</th>
              <th className="px-6 py-3 text-left font-medium">Role</th>
              <th className="px-6 py-3 text-left font-medium">Contact</th>
              <th className="px-6 py-3 text-left font-medium">Clinic</th>
              <th className="px-6 py-3 text-right font-medium">Action</th>
            </tr>
          </thead>

          <tbody>
            {members.map((m) => (
              <tr
                key={m.id}
                className="border-t border-white/5 hover:bg-zinc-900/60 transition"
              >
                {/* Member Info with Avatar */}
                <td className="px-6 py-2">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                      {m.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-white">{m.name}</p>
                      <p className="text-xs text-zinc-500">
                        ID #{m.id}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Role Badge */}
                <td className="px-6 py-2">
                  <span
                    className={`rounded-xl px-3 py-2 text-xs font-medium ${getRoleBadge(
                      m.role
                    )}`}
                  >
                    {m.role}
                  </span>
                </td>

                {/* Contact */}
                <td className="px-6 py-2 text-zinc-300">
                  <p>{m.email}</p>
                  <p className="text-xs pt-1 text-zinc-500">{m.phone}</p>
                </td>

                {/* Clinic */}
                <td className="px-6 py-2 text-zinc-300">
                  {m.clinic}
                </td>

                {/* View Only */}
                <td className="px-6 py-2 text-right">
                  <button
                    onClick={() => navigate(`/members/${m.id}`)}
                    className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium text-white cursor-pointer"
                  >
                    <Eye className="h-5 w-5 hover:text-blue-400" />
                    {/* View Details */}
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
