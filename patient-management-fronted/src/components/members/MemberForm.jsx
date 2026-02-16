import { useState } from "react";
import { Save, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MemberForm({ initialData, isEdit = false }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: initialData?.name || "",
    role: initialData?.role || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    clinic: initialData?.clinic || "",
    address: initialData?.address || "",
    status: initialData?.status || "Active",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", form);

    // TODO: connect to API
    navigate("/members");
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <button
          onClick={() => navigate("/members")}
          className="mb-3 flex items-center gap-1 text-sm text-zinc-400 hover:text-white cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Members
        </button>

        <h1 className="text-2xl font-semibold text-white">
          {isEdit ? "Edit Member" : "Create New Member"}
        </h1>
        <p className="text-sm text-zinc-400">
          {isEdit
            ? "Update member information"
            : "Fill in the details to add a new member"}
        </p>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-white/10 bg-zinc-950 p-8 shadow-xl space-y-6"
      >

        {/* Basic Info */}
        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="text-sm text-zinc-400">Full Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-400">Role *</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select Role</option>
              <option>Dentist</option>
              <option>Dental Assistant</option>
              <option>Receptionist</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-zinc-400">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-400">Phone *</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-400">Clinic *</label>
            <input
              name="clinic"
              value={form.clinic}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-400">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

        </div>

        {/* Address */}
        <div>
          <label className="text-sm text-zinc-400">Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            rows="3"
            className="mt-2 w-full rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={() => navigate("/members")}
            className="rounded-lg border border-white/10 bg-zinc-900 px-5 py-2 text-sm text-white hover:bg-zinc-800 cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white shadow-lg hover:bg-blue-500 cursor-pointer"
          >
            <Save className="h-4 w-4" />
            {isEdit ? "Save Changes" : "Create Member"}
          </button>
        </div>

      </form>
    </div>
  );
}
