import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

const clinics = [
  {
    id: "1",
    name: "Clinic 1",
    province: "Laguna",
    city: "Pakil",
    district: "Talavera",
    postalCode: "4017",
    street: "292 Cabcede Street",
    phone: "09123456789",
    email: "clinic1@email.com",
    status: "Active",
  },
  {
    id: "2",
    name: "Clinic 2",
    province: "Laguna",
    city: "Pakil",
    district: "Talavera",
    postalCode: "4017",
    street: "232 Cabcede Street",
    phone: "09123456789",
    email: "clinic2@email.com",
    status: "Inactive",
  },
];

export default function EditClinic() {
  const { id } = useParams();
  const navigate = useNavigate();

  const clinicData = clinics.find((c) => c.id === id);

  const [form, setForm] = useState(clinicData);

  if (!form) {
    return <p className="text-zinc-400">Clinic not found</p>;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated clinic:", form);

    // TODO: replace with real API update call

    navigate(`/clinics/${id}`);
  };

  return (
    <div className="max-w-4xl space-y-6">

      {/* Back */}
      <button
        onClick={() => navigate(`/clinics/${id}`)}
        className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Details
      </button>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Edit Clinic
        </h1>
        <p className="text-zinc-400">
          Update clinic information and status
        </p>
      </div>

      {/* Form Card */}
      <div className="rounded-xl border border-white/10 bg-zinc-900 p-6">

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <Input
            label="Clinic Name *"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          {/* Province / City */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Province *"
              name="province"
              value={form.province}
              onChange={handleChange}
            />
            <Input
              label="City *"
              name="city"
              value={form.city}
              onChange={handleChange}
            />
          </div>

          {/* District / Postal */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="District *"
              name="district"
              value={form.district}
              onChange={handleChange}
            />
            <Input
              label="Postal Code"
              name="postalCode"
              value={form.postalCode}
              onChange={handleChange}
            />
          </div>

          {/* Street */}
          <Input
            label="Street Address *"
            name="street"
            value={form.street}
            onChange={handleChange}
          />

          {/* Phone / Email */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Phone Number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
            <Input
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-6">
            <button
              type="button"
              onClick={() => navigate(`/clinics/${id}`)}
              className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-zinc-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200"
            >
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange }) {
  return (
    <div>
      <label className="text-sm text-zinc-300">{label}</label>
      <input
        name={name}
        value={value || ""}
        onChange={onChange}
        className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
    </div>
  );
}
