import {
  LayoutDashboard,
  Building2,
  Users,
  User,
  Stethoscope,
  Calendar,
  BarChart3,
} from "lucide-react";

const menu = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Clinics", icon: Building2 },
  { label: "Members", icon: Users },
  { label: "Patients", icon: User },
  { label: "Procedures", icon: Stethoscope },
  { label: "Appointments", icon: Calendar },
  { label: "Reports", icon: BarChart3 },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-zinc-950 border-r border-white/10 p-4">
      <h1 className="mb-6 text-xl font-bold text-white">Mong Yang Clinic</h1>

      <nav className="space-y-2">
        {menu.map((item) => (
          <button
            key={item.label}
            className="w-full text-left rounded-lg px-3 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            <div className="flex items-center gap-3">
              <item.icon className="h-4 w-4" />
              {item.label}
            </div>
          </button>
        ))}
      </nav>
    </aside>
  );
}
