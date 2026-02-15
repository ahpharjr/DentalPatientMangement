import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const patients = [
  { id: "1", fullName: "Dela Cruz, Juan Mantala" },
  { id: "2", fullName: "Santos, Maria Clara" },
];

const procedures = [
  "Tooth Extraction",
  "Dental Cleaning",
  "Root Canal",
  "Tooth Filling",
  "Braces Adjustment",
];

export default function NewTreatment() {
  const navigate = useNavigate();

  const [patientId, setPatientId] = useState("");
  const [procedure, setProcedure] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!patientId || !procedure) return;

    const newTreatment = {
      patientId,
      procedure,
      date: new Date().toISOString(),
    };

    console.log("New Treatment:", newTreatment);

    // later → send to API
    navigate("/treatments");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-zinc-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <h1 className="text-2xl font-semibold text-white mt-2">
          New Treatment
        </h1>
        <p className="text-sm text-zinc-400">
          Select patient and procedure
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl border border-white/10 bg-zinc-900 p-6 max-w-lg"
      >
        {/* Select Patient */}
        <div>
          <label className="block text-sm text-zinc-400 mb-2">
            Patient
          </label>
          <select
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            required
            className="w-full rounded-lg bg-zinc-800 border border-white/10 px-3 py-2 text-white"
          >
            <option value="">-- Select Patient --</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.fullName}
              </option>
            ))}
          </select>
        </div>

        {/* Select Procedure */}
        <div>
          <label className="block text-sm text-zinc-400 mb-2">
            Procedure
          </label>
          <select
            value={procedure}
            onChange={(e) => setProcedure(e.target.value)}
            required
            className="w-full rounded-lg bg-zinc-800 border border-white/10 px-3 py-2 text-white"
          >
            <option value="">-- Select Procedure --</option>
            {procedures.map((proc, index) => (
              <option key={index} value={proc}>
                {proc}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500 disabled:opacity-50"
            disabled={!patientId || !procedure}
          >
            Create Treatment
          </button>
        </div>
      </form>
    </div>
  );
}
