import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import { ArrowLeft } from "lucide-react";

export default function AddProcedure() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // simulate API
    setTimeout(() => {
      setLoading(false);
      navigate("/procedures");
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-3xl">
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
              Add New Procedure
            </h1>

            <p className="text-sm text-zinc-400">
              Add a new dental procedure to your organization
            </p>
          </div>
        }
      />

      {/* Form */}
      <Card>
        <h3 className="mb-1 text-sm font-medium text-white">
          Procedure Information
        </h3>
        <p className="mb-4 text-xs text-zinc-400">
          Enter the details of the new dental procedure
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="mb-1 block text-sm text-zinc-300">
              Procedure Name <span className="text-red-500">*</span>
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-zinc-700"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-1 block text-sm text-zinc-300">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full resize-none rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-zinc-700"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => navigate("/procedures")}
              className="rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200 disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Procedure"}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
