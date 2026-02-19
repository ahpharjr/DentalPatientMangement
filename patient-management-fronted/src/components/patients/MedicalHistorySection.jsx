import Checkbox from "../ui/Checkbox";

const ALLERGIES = ["Penicillin", "Latex", "Drug Allergies", "Food Allergies", "Environmental", "None"];
const CONDITIONS = ["Diabetes", "Heart Disease", "Hypertension", "Asthma", "Cancer", "None"];

export default function MedicalHistorySection({ allergies = [], medicalConditions = [], historyNotes = "" }) {
  return (
    <section className="rounded-xl border border-white/10 bg-zinc-950 p-6">
      <h3 className="mb-2 text-lg font-semibold text-white">Medical History</h3>

      <div className="space-y-6">
        <div>
          <p className="mb-2 text-sm text-zinc-300">Allergies *</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {ALLERGIES.map((a) => (
              <Checkbox key={a} label={a} defaultChecked={allergies.includes(a)} />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm text-zinc-300">Medical Conditions *</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {CONDITIONS.map((c) => (
              <Checkbox key={c} label={c} defaultChecked={medicalConditions.includes(c)} />
            ))}
          </div>
          <div className="mt-3">
            <label className="text-sm text-zinc-300">History Notes</label>
            <textarea
              name="historyNotes"
              placeholder="Please specify details about medical conditions or treatment history..."
              rows="3"
              defaultValue={historyNotes}
              className="w-full rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}