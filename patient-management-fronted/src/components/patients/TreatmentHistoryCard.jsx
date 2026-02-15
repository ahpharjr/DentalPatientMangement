import { Calendar, FileText } from "lucide-react";
import Card from "../ui/Card";

export default function AppointmentHistoryCard() {
  const hasAppointments = false; // dummy for now

  return (
    <Card className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-zinc-400" />
        <div>
          <h3 className="text-sm font-medium text-white">
            Treatment History
          </h3>
          <p className="text-xs text-zinc-400">
            Record of all treatments for this patient
          </p>
        </div>
      </div>

      {/* Empty State */}
      {!hasAppointments && (
        <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
          <FileText className="h-10 w-10 text-zinc-500" />
          <p className="text-sm font-medium text-white">
            No Treatments
          </p>
          <p className="text-xs text-zinc-400">
            This patient doesn't have any treatments yet.
          </p>

          {/* <button className="mt-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200">
            Create Appointment
          </button> */}
        </div>
      )}
    </Card>
  );
}
