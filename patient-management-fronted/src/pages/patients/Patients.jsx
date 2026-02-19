import PageHeader from "../../components/ui/PageHeader";
import RowActions from "../../components/ui/RowActions";
import { Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Patients() {
  const navigate = useNavigate();

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
        <div className="flex gap-2  max-w-sm w-full">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
            <input
              placeholder="Search patients by ID or name..."
              className="w-full rounded-lg border border-white/10 bg-zinc-900 py-2 pl-9 pr-3 text-sm text-white placeholder-zinc-500"
            />
          </div>
          {/* <button className="rounded-lg bg-zinc-800 px-4 text-sm text-white hover:bg-zinc-700">
            Search
          </button> */}
        </div>

        <p className="text-sm text-zinc-400 mr-4">
          Total Patients: <span className="font-semibold text-white">{patients.length}</span>
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

const patients = [
  {
    id: "1",
    name: "Santos, Maria L.",
    age: "34",
    gender: "Female",
    email: "maria.santos@email.com",
    status: "Married",
    clinic: "Downtown Dental Clinic",
  },
  {
    id: "2",
    name: "Reyes, Carlo P.",
    age: "41",
    gender: "Male",
    email: "carlo.reyes@email.com",
    status: "Married",
    clinic: "Smile Care Center",
  },
  {
    id: "3",
    name: "Garcia, Angela M.",
    age: "29",
    gender: "Female",
    email: "angela.garcia@email.com",
    status: "Single",
    clinic: "Downtown Dental Clinic",
  },
  {
    id: "4",
    name: "Torres, Michael A.",
    age: "52",
    gender: "Male",
    email: "michael.torres@email.com",
    status: "Married",
    clinic: "Prime Dental Studio",
  },
  {
    id: "5",
    name: "Villanueva, Sophia R.",
    age: "23",
    gender: "Female",
    email: "sophia.v@email.com",
    status: "Single",
    clinic: "Smile Care Center",
  },
  {
    id: "6",
    name: "Lim, Daniel K.",
    age: "37",
    gender: "Male",
    email: "daniel.lim@email.com",
    status: "Married",
    clinic: "BrightSmile Clinic",
  },
  {
    id: "7",
    name: "Chua, Isabella T.",
    age: "46",
    gender: "Female",
    email: "isabella.chua@email.com",
    status: "Married",
    clinic: "Prime Dental Studio",
  },
  {
    id: "8",
    name: "Tan, Joshua C.",
    age: "31",
    gender: "Male",
    email: "joshua.tan@email.com",
    status: "Single",
    clinic: "BrightSmile Clinic",
  },
  {
    id: "9",
    name: "Lopez, Camille D.",
    age: "27",
    gender: "Female",
    email: "camille.lopez@email.com",
    status: "Single",
    clinic: "Downtown Dental Clinic",
  },
  {
    id: "10",
    name: "Fernandez, Mark J.",
    age: "58",
    gender: "Male",
    email: "mark.fernandez@email.com",
    status: "Married",
    clinic: "Smile Care Center",
  },
];
