import StatCard from "../components/dashboard/StatCard";
import QuickActionCard from "../components/dashboard/QuickActionCard";

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
          value="0"
          subtitle="+0 from yesterday"
          icon={Calendar}
        />
        <StatCard
          title="Total Patients"
          value="192"
          subtitle="+0 new this week"
          icon={Users}
        />
        <StatCard
          title="Today's Revenue"
          value="₱0.00"
          subtitle="+0 from yesterday"
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
            description="Create new patient"
            icon={UserPlus}
          />
          <QuickActionCard
            title="Add New Treatment"
            description="Create new treatment"
            icon={Activity}
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
