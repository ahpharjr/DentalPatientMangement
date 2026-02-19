import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../ui/PageHeader";

export default function ProcedurePageHeader({ title, subtitle, backTo, backLabel, action }) {
  const navigate = useNavigate();

  return (
    <PageHeader
      title={
        <div className="space-y-1">
          <button
            onClick={() => navigate(backTo)}
            className="flex items-center gap-1 text-sm text-zinc-400 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </button>
          <h1 className="text-xl font-semibold text-white">{title}</h1>
          <p className="text-sm text-zinc-400">{subtitle}</p>
        </div>
      }
      action={action}
    />
  );
}