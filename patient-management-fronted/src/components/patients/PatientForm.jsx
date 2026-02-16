import Input from "../ui/Input";
import Select from "../ui/Select";
import MedicalHistorySection from "./MedicalHistorySection";
import EmergencyContacts from "./EmergencyContacts";
import Button from "../ui/Button";

export default function PatientForm() {
  return (
    <form className="space-y-8">
      {/* Patient Information */}
      <section className="rounded-xl border border-white/10 bg-zinc-950 p-6">
        <h3 className="mb-1 text-lg font-semibold text-white">
          Patient Information
        </h3>
        <p className="mb-6 text-sm text-zinc-400">
          Enter the details of the new patient
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input 
            label="Full Name" required />
          <Select
            label="Gender"
            required
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
            ]}
          />
          <div>
            <label className="text-sm text-zinc-300">
              Scheduled Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-900  px-3 py-2 text-sm text-white"
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Marital Status"
            required
            options={[
              { label: "Single", value: "single" },
              { label: "Married", value: "married" },
            ]}
          />
          <Select
            label="Clinic"
            options={[
              { label: "None", value: "" },
              { label: "Clinic 1", value: "1" },
              { label: "Clinic 2", value: "2" },
            ]}
          />
        </div>

        {/* Address */}
        <div className="mt-3">
          <label className="text-sm ">Address</label>
          <textarea
            name="address"
            rows="3"
            className=" w-full rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Email Address" />
          <Input label="Phone Number" />
        </div>
      </section>

      <EmergencyContacts />
      <MedicalHistorySection />

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button variant="ghost">Cancel</Button>
        <Button>Create Patient</Button>
      </div>
    </form>
  );
}
