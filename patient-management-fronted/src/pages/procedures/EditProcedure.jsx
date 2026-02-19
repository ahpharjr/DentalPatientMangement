import { useNavigate, useParams } from "react-router-dom";
import ProcedurePageHeader from "../../components/procedures/ProcedurePageHeader";
import ProcedureForm from "../../components/procedures/ProcedureForm";
import { procedures } from "../../data/procedures";

export default function EditProcedure() {
  const navigate = useNavigate();
  const { id } = useParams();
  const procedure = procedures.find((p) => p.id === id);

  if (!procedure) return (
    <p className="text-sm text-zinc-500">Procedure not found.</p>
  );

  return (
    <div className="max-w-3xl space-y-6">
      <ProcedurePageHeader
        title="Edit Procedure"
        subtitle="Update the details of this dental procedure"
        backTo={`/procedures/${id}`}
        backLabel="Back to Procedure"
      />
      <ProcedureForm
        procedure={procedure}
        onSubmit={() => navigate(`/procedures/${id}`)}
      />
    </div>
  );
}