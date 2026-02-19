import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppointmentForm from "../../components/appointments/AppointmentForm";

export default function NewAppointment() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-4xl">
      <button
        onClick={() => navigate("/appointments")}
        className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Appointments
      </button>

      <div>
        <h1 className="text-2xl font-semibold text-white">Add New Appointment</h1>
        <p className="text-sm text-zinc-400">Record a new dental appointment for a patient</p>
      </div>

      <AppointmentForm onSubmit={() => navigate("/appointments")} />
    </div>
  );
}