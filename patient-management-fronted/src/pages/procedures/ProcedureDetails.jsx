import { useNavigate, useParams } from "react-router-dom";
import Card from "../../components/ui/Card";
import ProcedurePageHeader from "../../components/procedures/ProcedurePageHeader";
import { Pencil, Stethoscope, CalendarClock } from "lucide-react";
import { procedures } from "../../data/procedures";

export default function ProcedureDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const procedure = procedures.find((p) => p.id === id);

  if (!procedure) return (
    <p className="text-sm text-zinc-500">Procedure not found.</p>
  );

  return (
    <div className="space-y-6">
      <ProcedurePageHeader
        title={procedure.name}
        subtitle="Procedure details and information"
        backTo="/procedures"
        backLabel="Back to Procedures"
        action={
          <button
            onClick={() => navigate(`/procedures/${id}/edit`)}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800 cursor-pointer"
          >
            <Pencil className="h-4 w-4" />
            Edit Procedure
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <div className="mb-1 flex items-center gap-2">
            <Stethoscope className="h-4 w-4 text-zinc-400" />
            <h3 className="text-sm font-medium text-white">Procedure Information</h3>
          </div>
          <p className="mb-4 text-xs text-zinc-400">Details about this dental procedure</p>

          <div className="space-y-3 text-sm">
            <InfoRow label="Name" value={procedure.name} />
            <InfoRow label="Description" value={procedure.description} wide />
          </div>
        </Card>

        <Card>
          <div className="mb-1 flex items-center gap-2">
            <CalendarClock className="h-4 w-4 text-zinc-400" />
            <h3 className="text-sm font-medium text-white">Metadata</h3>
          </div>
          <p className="mb-4 text-xs text-zinc-400">System information about this procedure</p>

          <div className="space-y-3 text-sm">
            <InfoRow label="Created" value={procedure.createdAt} />
            <InfoRow label="Last Updated" value={procedure.updatedAt} />
          </div>
        </Card>
      </div>
    </div>
  );
}

function InfoRow({ label, value, wide }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="shrink-0 text-zinc-400">{label}</span>
      <span className={`text-white ${wide ? "text-right" : ""}`}>{value}</span>
    </div>
  );
}