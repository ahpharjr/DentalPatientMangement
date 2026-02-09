import { Tornado } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";


export default function DentalChartsCard() {
    const navigate = useNavigate();
    const { id } = useParams();

    return (
        <div className="rounded-xl border border-white/10 bg-zinc-900 p-5">
            {/* Header */}
            <div className="mb-4 flex items-start gap-2">
                <Tornado className="mt-0.5 h-4 w-4 text-white" />
                <div>
                    <h3 className="text-sm font-medium text-white">
                        Dental Charts
                    </h3>
                    <p className="text-xs text-zinc-400">
                        Access primary and permanent teeth charts for comprehensive dental record management
                    </p>
                </div>
            </div>

            {/* Charts */}
            <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-dashed border-white/10 p-4 text-center">
                    <h4 className="text-sm font-medium text-white">
                        Primary Teeth (Child)
                    </h4>
                    <p className="mb-4 text-xs text-zinc-400">
                        Universal Numbering System (A–T)
                    </p>
                    <button 
                        onClick={() => navigate(`/patients/${id}/primary-teeth`)}
                        className="w-full rounded-lg bg-white px-4 py-2 text-sm text-black hover:bg-zinc-200">
                        View Primary Chart
                    </button>
                </div>

                <div className="rounded-lg border border-dashed border-white/10 p-4 text-center">
                    <h4 className="text-sm font-medium text-white">
                        Permanent Teeth (Adult)
                    </h4>
                    <p className="mb-4 text-xs text-zinc-400">
                        Universal Numbering System (1–32)
                    </p>
                    <button className="w-full rounded-lg bg-white px-4 py-2 text-sm text-black hover:bg-zinc-200">
                        View Permanent Chart
                    </button>
                </div>
            </div>
        </div>
    );
}
