import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import { ArrowLeft, Pencil, Stethoscope, CalendarClock  } from "lucide-react";

const mockProcedure = {
    id: "1",
    name: "Dental cleaning",
    description: "This is a dental cleaning basic",
    createdAt: "September 27th, 2025",
    updatedAt: "September 27th, 2025",
};

export default function ProcedureDetails() {
    const navigate = useNavigate();
    const { id } = useParams();

    // later: fetch by id
    const procedure = mockProcedure;

    return (
        <div className="space-y-6">
            {/* Header */}
            <PageHeader
                title={
                    <div className="space-y-1">
                        <button
                            onClick={() => navigate("/procedures")}
                            className="flex items-center gap-1 text-sm text-zinc-400 hover:text-white"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Procedures
                        </button>

                        <h1 className="text-xl font-semibold text-white">
                            {procedure.name}
                        </h1>

                        <p className="text-sm text-zinc-400">
                            Procedure details and information
                        </p>
                    </div>
                }
                action={
                    <button
                        onClick={() => navigate(`/procedures/${id}/edit`)}
                        className="flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800"
                    >
                        <Pencil className="h-4 w-4" />
                        Edit Procedure
                    </button>
                }
            />

            {/* Content */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Procedure Information */}
                <Card>
                    {/* Header */}
                    <div className="mb-1 flex items-center gap-2">
                        <Stethoscope className="h-4 w-4 text-zinc-400" />
                        <h3 className="text-sm font-medium text-white">
                            Procedure Information
                        </h3>
                    </div>
                    <p className="mb-4 text-xs text-zinc-400">
                        Details about this dental procedure
                    </p>

                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-zinc-400">Name</span>
                            <span className="text-white">{procedure.name}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-zinc-400">Description</span>
                            <span className="max-w-[60%] text-right text-zinc-300">
                                {procedure.description}
                            </span>
                        </div>
                    </div>
                </Card>

                {/* Metadata */}
                <Card>
                    {/* Header */}
                    <div className="mb-1 flex items-center gap-2">
                        <CalendarClock  className="h-4 w-4 text-zinc-400" />
                        <h3 className="text-sm font-medium text-white">
                            Metadata
                        </h3>
                    </div>
                    <p className="mb-4 text-xs text-zinc-400">
                        System information about this procedure
                    </p>

                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-zinc-400">Created</span>
                            <span className="text-white">
                                {procedure.createdAt}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-zinc-400">Last Updated</span>
                            <span className="text-white">
                                {procedure.updatedAt}
                            </span>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
