import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { patients } from "../../data/patients";
import { procedures } from "../../data/procedures";

export default function NewAppointment() {
  const navigate = useNavigate();

  const [procedureList, setProcedureList] = useState([
    { procedure: "", findings: "" },
  ]);

  const addProcedure = () => {
    setProcedureList([...procedureList, { procedure: "", findings: "" }]);
  };

  const removeProcedure = (index) => {
    setProcedureList(procedureList.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Back */}
      <button
        onClick={() => navigate("/appointments")}
        className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Appointments
      </button>

      {/* Title */}
      <div>
        <h1 className="text-2xl font-semibold text-white">
          Add New Appointment
        </h1>
        <p className="text-sm text-zinc-400">
          Record a new dental appointment for a patient
        </p>
      </div>

      {/* Card */}
      <div className="rounded-xl border border-white/10 bg-zinc-900 p-6 space-y-6">
        <div>
          <h2 className="text-lg font-medium text-white">
            Appointment Information
          </h2>
          <p className="text-sm text-zinc-400">
            Enter the details of the new dental appointment
          </p>
        </div>

        {/* Patient */}
        <div>
          <label className="text-sm text-white">
            Patient <span className="text-red-500">*</span>
          </label>
          <select className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-800 px-3 py-2 text-sm text-white">
            <option>Select a patient</option>
            {patients.map((p) => (
              <option key={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-white">
              Scheduled Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-800 px-3 py-2 text-sm text-white"
            />
          </div>

          <div>
            <label className="text-sm text-white">
              Scheduled Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-800 px-3 py-2 text-sm text-white"
            />
          </div>
        </div>

        {/* Payment */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-white">Cost (PHP)</label>
            <input
              type="number"
              className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-800 px-3 py-2 text-sm text-white"
            />
          </div>

          <div>
            <label className="text-sm text-white">
              Payment Status <span className="text-red-500">*</span>
            </label>
            <select className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-800 px-3 py-2 text-sm text-white">
              <option>Unpaid</option>
              <option>Paid</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-white">
              Payment Method <span className="text-red-500">*</span>
            </label>
            <select className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-800 px-3 py-2 text-sm text-white">
              <option>Cash</option>
              <option>Card</option>
              <option>Transfer</option>
            </select>
          </div>
        </div>

        {/* Procedures */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm text-white">
              Procedures and Findings <span className="text-red-500">*</span>
            </label>
            <button
              onClick={addProcedure}
              className="flex items-center gap-1 rounded-lg border border-white/10 bg-zinc-800 px-3 py-1.5 text-sm text-white hover:bg-zinc-700"
            >
              <Plus className="h-4 w-4" />
              Add Procedure
            </button>
          </div>

          {procedureList.map((item, index) => (
            <div
              key={index}
              className="rounded-lg border border-white/10 bg-zinc-800 p-4 space-y-3 relative"
            >
              <button
                onClick={() => removeProcedure(index)}
                className="absolute right-3 top-3 text-red-500 hover:text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </button>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-white">Procedure</label>
                  <select className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white">
                    <option>Select a procedure</option>
                    {procedures.map((p) => (
                      <option key={p}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm text-white">Findings</label>
                  <textarea
                    rows="3"
                    className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white"
                    placeholder="Enter any findings, notes, or observations..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Follow-up */}
        <div>
          <label className="text-sm text-white">
            Does this patient need a follow-up appointment?
          </label>
          <div className="mt-2 flex gap-6 text-sm text-zinc-300">
            <label className="flex items-center gap-2">
              <input type="radio" name="followup" />
              Yes
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="followup" defaultChecked />
              No
            </label>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="text-sm text-white">Additional Notes</label>
          <textarea
            rows="4"
            className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-800 px-3 py-2 text-sm text-white"
            placeholder="Enter any additional notes about this appointment..."
          />
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-4">
          <button
            onClick={() => navigate("/appointments")}
            className="rounded-lg border border-white/10 bg-zinc-800 px-4 py-2 text-sm text-white hover:bg-zinc-700"
          >
            Cancel
          </button>

          <button className="rounded-lg bg-white px-6 py-2 text-sm font-medium text-black hover:bg-zinc-200">
            Create Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
