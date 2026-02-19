import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../ui/Card";

export default function ProcedureForm({ procedure = null, onSubmit }) {
  const navigate = useNavigate();
  const isEdit = !!procedure;

  const [name, setName] = useState(procedure?.name ?? "");
  const [description, setDescription] = useState(procedure?.description ?? "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSubmit?.({ name, description });
    }, 1200);
  };

  return (
    <Card>
      <h3 className="mb-1 text-sm font-medium text-white">
        Procedure Information
      </h3>
      <p className="mb-4 text-xs text-zinc-400">
        {isEdit ? "Modify the details of the dental procedure" : "Enter the details of the new dental procedure"}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200 disabled:opacity-60 cursor-pointer"
          >
            {loading ? (isEdit ? "Saving..." : "Creating...") : (isEdit ? "Save Changes" : "Create Procedure")}
          </button>
        </div>
      </form>
    </Card>
  );
}