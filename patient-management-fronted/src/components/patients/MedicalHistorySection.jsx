import Checkbox from "../ui/Checkbox";
import Textarea from "../ui/Testarea";

export default function MedicalHistorySection() {
  return (
    <section className="rounded-xl border border-white/10 bg-zinc-950 p-6">
      <h3 className="mb-2 text-lg font-semibold text-white">
        Medical History
      </h3>

      <div className="space-y-6">
        <div>
          <p className="mb-2 text-sm text-zinc-300">Allergies *</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <Checkbox label="Penicillin" />
            <Checkbox label="Latex" />
            <Checkbox label="Drug Allergies" />
            <Checkbox label="Food Allergies" />
            <Checkbox label="Environmental" />
            <Checkbox label="None" />
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm text-zinc-300">Medical Conditions *</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <Checkbox label="Diabetes" />
            <Checkbox label="Heart Disease" />
            <Checkbox label="Hypertension" />
            <Checkbox label="Asthma" />
            <Checkbox label="Cancer" />
            <Checkbox label="None" />
          </div>
          <div className="mt-3">
            <label className="text-sm ">Address</label>
            <textarea
              name="address"
              placeholder="Please specify details about medical conditions..."
              rows="3"
              className=" w-full rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
