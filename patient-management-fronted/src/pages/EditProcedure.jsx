import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import { ArrowLeft } from "lucide-react";

// same mock data as details page
const mockProcedure = {
  id: "1",
  name: "Dental cleaning",
  description: "This is a dental cleaning basic",
};

export default function EditProcedure() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // preload existing data
  useEffect(() => {
    // later: fetch by id
    setName(mockProcedure.name);
    setDescription(mockProcedure.description);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // simulate API update
    setTimeout(() => {
      setLoading(false);
      navigate(`/procedures/${id}`);
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <PageHeader
        title={
          <div className="space-y-1">
            <button
              onClick={() => navigate(`/procedures/${id}`)}
              className="flex items-center gap-1 text-sm text-zinc-400 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Procedure
            </button>

            <h1 className="text-xl font-semibold text-white">
              Edit Procedure
            </h1>

            <p className="text-sm text-zinc-400">
              Update the details of this dental procedure
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
          Modify the details of the dental procedure
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
              onClick={() => navigate(`/procedures/${id}`)}
              className="rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200 disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
