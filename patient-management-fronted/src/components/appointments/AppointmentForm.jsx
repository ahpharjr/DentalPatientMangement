import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { patients } from "../../data/patients";
import { procedures } from "../../data/procedures";

export default function AppointmentForm({ appointment = null, onSubmit }) {
  const navigate = useNavigate();
  const isEdit = !!appointment;

  const [procedureList, setProcedureList] = useState(
    appointment?.procedures ?? [{ procedure: "", findings: "" }]
  );
  const [followUp, setFollowUp] = useState(appointment?.followUp ?? false);
  const [loading, setLoading] = useState(false);

  const addProcedure = () =>
    setProcedureList([...procedureList, { procedure: "", findings: "" }]);

  const removeProcedure = (index) =>
    setProcedureList(procedureList.filter((_, i) => i !== index));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSubmit?.();
    }, 1200);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-zinc-900 p-6 space-y-6">
      <div>
        <h2 className="text-lg font-medium text-white">Appointment Information</h2>
        <p className="text-sm text-zinc-400">
          {isEdit ? "Update the details of this appointment" : "Enter the details of the new dental appointment"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Patient */}
        <Field label="Patient" required>
          <select
            defaultValue={appointment?.patientId ?? ""}
            className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-800 px-3 py-2 text-sm text-white"
          >
            <option value="" disabled>Select a patient</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </Field>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="Scheduled Date" required>
            <input
              type="date"
              defaultValue={appointment?.date}
              className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-800 px-3 py-2 text-sm text-white"
            />
          </Field>
          <Field label="Scheduled Time" required>
            <input
              type="time"
              defaultValue={appointment?.time}
              className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-800 px-3 py-2 text-sm text-white"
            />
          </Field>
        </div>

        {/* Payment */}
        <div className="grid grid-cols-3 gap-4">
          <Field label="Cost ">
            <input
              type="number"
              defaultValue={appointment?.cost}
              className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-800 px-3 py-2 text-sm text-white"
            />
          </Field>
          <Field label="Payment Status" required>
            <select
              defaultValue={appointment?.paymentStatus ?? "UNPAID"}
              className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-800 px-3 py-2 text-sm text-white"
            >
              <option value="UNPAID">Unpaid</option>
              <option value="PAID">Paid</option>
              <option value="PARTIAL">Partial</option>
            </select>
          </Field>
          <Field label="Payment Method" required>
            <select
              defaultValue={appointment?.paymentMethod ?? "Cash"}
              className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-800 px-3 py-2 text-sm text-white"
            >
              <option>Cash</option>
              <option>GCash</option>
              <option>Credit Card</option>
              <option>Bank Transfer</option>
            </select>
          </Field>
        </div>

        {/* Procedures */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm text-white">
              Procedures and Findings <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              onClick={addProcedure}
              className="flex items-center gap-1 rounded-lg border border-white/10 bg-zinc-800 px-3 py-1.5 text-sm text-white hover:bg-zinc-700"
            >
              <Plus className="h-4 w-4" />
              Add Procedure
            </button>
          </div>

          {procedureList.map((item, index) => (
            <div key={index} className="relative rounded-lg border border-white/10 bg-zinc-800 p-4 space-y-3">
              {procedureList.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProcedure(index)}
                  className="absolute right-3 top-3 text-zinc-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}

              <p className="text-xs font-medium text-zinc-400">Procedure #{index + 1}</p>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Procedure">
                  <select
                    defaultValue={item.procedure}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white"
                  >
                    <option value="" disabled>Select a procedure</option>
                    {procedures.map((p) => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Findings">
                  <textarea
                    rows={3}
                    defaultValue={item.findings}
                    placeholder="Enter any findings, notes, or observations..."
                    className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white resize-none"
                  />
                </Field>
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
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="followup"
                checked={followUp}
                onChange={() => setFollowUp(true)}
              />
              Yes
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="followup"
                checked={!followUp}
                onChange={() => setFollowUp(false)}
              />
              No
            </label>
          </div>

          {followUp && (
            <div className="mt-3">
              <Field label="Next Appointment Date">
                <input
                  type="date"
                  defaultValue={appointment?.nextAppointment ?? ""}
                  className="mt-1 w-full max-w-xs rounded-lg border border-white/10 bg-zinc-800 px-3 py-2 text-sm text-white"
                />
              </Field>
            </div>
          )}
        </div>

        {/* Notes */}
        <Field label="Additional Notes">
          <textarea
            rows={4}
            defaultValue={appointment?.notes}
            placeholder="Enter any additional notes about this appointment..."
            className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-800 px-3 py-2 text-sm text-white resize-none"
          />
        </Field>

        {/* Actions */}
        <div className="flex justify-between pt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-lg border border-white/10 bg-zinc-800 px-4 py-2 text-sm text-white hover:bg-zinc-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-white px-6 py-2 text-sm font-medium text-black hover:bg-zinc-200 disabled:opacity-60"
          >
            {loading
              ? isEdit ? "Saving..." : "Creating..."
              : isEdit ? "Save Changes" : "Create Appointment"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <div>
      <label className="text-sm text-white">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}