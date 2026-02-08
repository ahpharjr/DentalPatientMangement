import StatCard from "../components/dashboard/StatCard";
import QuickActionCard from "../components/dashboard/QuickActionCard";

import {
  Calendar,
  Users,
  DollarSign,
  Clock,
  Search,
  UserPlus,
  CalendarSearch,
  CalendarPlus,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-zinc-400">
          Welcome to your Dentistly dashboard
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <StatCard
          title="Today's Appointments"
          value="0"
          subtitle="+0 from yesterday"
          icon={Calendar}
        />
        <StatCard
          title="Active Patients"
          value="192"
          subtitle="+0 new this week"
          icon={Users}
        />
        <StatCard
          title="Today's Revenue"
          value="₱0.00"
          subtitle="No change from last week"
          icon={DollarSign}
        />
        <StatCard
          title="Upcoming Appointments"
          value="0"
          subtitle="Next 48 hours"
          icon={Clock}
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
          />
          <QuickActionCard
            title="Add New Patient"
            description="Create patient record"
            icon={UserPlus}
          />
          <QuickActionCard
            title="Search Appointment"
            description="Find appointments"
            icon={CalendarSearch}
          />
          <QuickActionCard
            title="Add New Appointment"
            description="Schedule new appointment"
            icon={CalendarPlus}
          />
        </div>
      </div>
    </div>
  );
}
