import StatCard from "../components/dashboard/StatCard";
import QuickActionCard from "../components/dashboard/QuickActionCard";
import { useNavigate } from "react-router-dom";

import {
  Calendar,
  Users,
  DollarSign,
  Clock,
  Search,
  UserPlus,
  Activity,
  CalendarPlus,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-zinc-400">
          Welcome back to Mong Yang Clinic! Here's a quick overview of your clinic's performance and activities.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <StatCard
          title="Today's Treatments"
          value="9"
          subtitle="+2 from yesterday"
          icon={Calendar}
          onClick={() => navigate("/treatments?filter=today")}
        />

        <StatCard
          title="Total Patients"
          value="192"
          subtitle="+10 new this week"
          icon={Users}
          onClick={() => navigate("/patients")}
        />

        <StatCard
          title="Today's Revenue"
          value="¥5060.00"
          subtitle="+0 from yesterday"
          icon={DollarSign}
          onClick={() => navigate("/reports")}
        />

        <StatCard
          title="Upcoming Appointments"
          value="8"
          subtitle="Next 3 days"
          icon={Clock}
          onClick={() => navigate("/appointments?filter=next3")}
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-white">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <QuickActionCard
            title="Search Patient"
            description="Find existing patients"
            icon={Search}
            onClick={() => {
              console.log("clicked");
              navigate("/patients");
            }}

          />

          <QuickActionCard
            title="Add New Patient"
            description="Create new patient"
            icon={UserPlus}
            onClick={() => navigate("/patients/new")}
          />

          <QuickActionCard
            title="Add New Treatment"
            description="Create new treatment"
            icon={Activity}
            onClick={() => navigate("/treatments/new")}
          />

          <QuickActionCard
            title="Add New Appointment"
            description="Schedule new appointment"
            icon={CalendarPlus}
            onClick={() => navigate("/appointments/new")}
          />
        </div>
      </div>
    </div>
  );
}
