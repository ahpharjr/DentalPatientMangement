import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NewClinic() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl space-y-6">
      {/* Back */}
      <button
        onClick={() => navigate("/clinics")}
        className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Clinics
      </button>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Add New Clinic</h1>
        <p className="text-zinc-400">
          Add a new dental clinic location to your organization
        </p>
      </div>

      {/* Form Card */}
      <div className="rounded-xl border border-white/10 bg-zinc-900 p-6">
        <h2 className="mb-1 font-semibold text-white">
          Clinic Information
        </h2>
        <p className="mb-6 text-sm text-zinc-400">
          Enter the details of your new clinic location
        </p>

        <form className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm text-zinc-300">
              Name <span className="text-red-500">*</span>
            </label>
            <input className="input" />
          </div>

          {/* Province / City */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input label="Province *" />
            <Input label="City *" />
          </div>

          {/* Barangay / Postal */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input label="District *" />
            <Input label="Postal Code" />
          </div>

          {/* Street */}
          <Input label="Street Address *" />

          {/* Phone / Email */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input label="Phone Number" />
            <Input label="Email" />
          </div>

          {/* Active */}
          <div className="flex items-center gap-2">
            <input type="checkbox" defaultChecked />
            <span className="text-sm text-zinc-300">
              This clinic is active
            </span>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/clinics")}
              className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-zinc-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-white px-4 py-2 text-sm text-black hover:bg-zinc-200"
            >
              Create Clinic
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({ label }) {
  return (
    <div>
      <label className="text-sm text-zinc-300">{label}</label>
      <input className="input" />
    </div>
  );
}
