import { useNavigate } from "react-router-dom";
import ProcedurePageHeader from "../../components/procedures/ProcedurePageHeader";
import ProcedureForm from "../../components/procedures/ProcedureForm";

export default function AddProcedure() {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl space-y-6">
      <ProcedurePageHeader
        title="Add New Procedure"
        subtitle="Add a new dental procedure to your organization"
        backTo="/procedures"
        backLabel="Back to Procedures"
      />
      <ProcedureForm onSubmit={() => navigate("/procedures")} />
    </div>
  );
}