import { NavLink } from "react-router-dom";
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
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Clinics", icon: Building2, path: "/clinics" },
  { label: "Members", icon: Users, path: "/members" },
  { label: "Patients", icon: User, path: "/patients" },
  { label: "Procedures", icon: Stethoscope, path: "/procedures" },
  { label: "Appointments", icon: Calendar, path: "/appointments" },
  { label: "Reports", icon: BarChart3, path: "/reports" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-zinc-950 border-r border-white/10 p-4">
      <h1 className="mb-6 text-xl font-bold text-white">
        Mong Yang Clinic
      </h1>

      <nav className="space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition
              ${
                isActive
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
              }`
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
