import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import AppointmentForm from "../../components/appointments/AppointmentForm";
import { appointments } from "../../data/appointments";
import { patients } from "../../data/patients";

export default function EditAppointment() {
  const navigate = useNavigate();
  const { id } = useParams();

  const appointment = appointments.find((a) => a.id === id);
  const patient = patients.find((p) => p.id === appointment?.patientId);

  if (!appointment) return <p className="text-sm text-zinc-500">Appointment not found.</p>;

  return (
    <div className="space-y-6 max-w-4xl">
      <button
        onClick={() => navigate(`/appointments/${id}`)}
        className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Appointment
      </button>

      <div>
        <h1 className="text-2xl font-semibold text-white">Edit Appointment</h1>
        <p className="text-sm text-zinc-400">
          Updating appointment for{" "}
          <span className="text-white font-medium">{patient?.name ?? appointment.patientId}</span>
        </p>
      </div>

      <AppointmentForm
        appointment={appointment}
        onSubmit={() => navigate(`/appointments/${id}`)}
      />
    </div>
  );
}