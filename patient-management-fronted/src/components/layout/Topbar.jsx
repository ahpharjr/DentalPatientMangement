import { Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Badge from "../ui/Badge";

export default function Topbar({ darkMode, toggleDarkMode }) {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between px-6 py-4 
                       backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 
                       border-b border-zinc-200 dark:border-white/10 
                       transition-colors duration-300">

      {/* Left */}
      <div className="flex items-center gap-3">
        <div>
          <h2 className="font-semibold text-lg">
            Dr. Sai Pee
          </h2>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            Dental Clinic Owner
          </div>
        </div>
        <Badge label="Owner" />
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition cursor-pointer"
        >
          {darkMode ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5 text-zinc-600" />
          )}
        </button>

        {/* Clickable Profile */}
        <button
          onClick={() => navigate("/profile")}
          className="rounded-full focus:outline-none cursor-pointer"
        >
          <img
            src="/ahphar.png"
            alt="Profile"
            className="h-9 w-9 rounded-full object-cover border border-zinc-300 dark:border-white/10 hover:scale-105 transition"
          />
        </button>
      </div>
    </header>
  );
}
