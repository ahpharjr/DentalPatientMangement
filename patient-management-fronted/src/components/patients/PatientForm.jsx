import Input from "../ui/Input";
import Select from "../ui/Select";
import Textarea from "../ui/Testarea";
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
          <Input label="Last Name" required />
          <Input label="First Name" required />
          <Input label="Middle Name" />
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Gender"
            required
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
            ]}
          />
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

        <div className="mt-4">
          <Textarea label="Address" />
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
