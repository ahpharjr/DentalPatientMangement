import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Users,
  User,
  Stethoscope,
  Calendar,
  BarChart3,
  ClipboardCheck,
  Activity,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

const menu = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Clinics", icon: Building2, path: "/clinics" },
  { label: "Members", icon: Users, path: "/members" },
  { label: "Patients", icon: User, path: "/patients" },
  { label: "Procedures", icon: Stethoscope, path: "/procedures" },
  { label: "Appointments", icon: Calendar, path: "/appointments" },
  { label: "Treatment", icon: Activity, path: "/treatments" },
  { label: "Treatment History", icon: ClipboardCheck, path: "/treatment-history" },
  { label: "Reports", icon: BarChart3, path: "/reports" },
];

export default function Sidebar({ open, toggleSidebar }) {
  return (
    <aside
      className={`${
        open ? "w-64" : "w-20"
      } transition-all duration-300 bg-zinc-950 border-r border-white/10 flex flex-col`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3 overflow-hidden">
          {/* Logo Circle */}
          {/* <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 font-bold text-sm">
            MY
          </div> */}

          {/* App Name */}
          <h1
            className={`font-semibold text-white whitespace-nowrap transition-all duration-300 ${
              open ? "opacity-100" : "opacity-0 w-0"
            }`}
          >
            Mong Yang Clinic
          </h1>
        </div>

        {/* Toggle */}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-zinc-800 transition"
        >
          {open ? (
            <PanelLeftClose className="h-5 w-5 text-zinc-400" />
          ) : (
            <PanelLeftOpen className="h-5 w-5 text-zinc-400" />
          )}
        </button>
      </div>

      {/* MENU */}
      <nav className="flex-1 px-3 space-y-1">
        {menu.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `group relative flex items-center ${
                open ? "justify-start px-3" : "justify-center"
              } gap-3 rounded-xl py-2.5 text-sm transition-all duration-200
              
              ${
                isActive
                  ? "bg-blue-500/10 text-blue-400"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`
            }
          >
            {/* Active Left Indicator */}
            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-blue-500 opacity-0 group-[.active]:opacity-100"></span>

            <item.icon className="h-5 w-5 flex-shrink-0" />

            {open && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* FOOTER */}
      {open && (
        <div className="px-4 py-4 text-xs text-zinc-500 border-t border-white/5">
          © 2026 Dental System
        </div>
      )}
    </aside>
  );
}
