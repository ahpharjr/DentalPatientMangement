import Input from "../ui/Input";
import Select from "../ui/Select";
import MedicalHistorySection from "./MedicalHistorySection";
import EmergencyContacts from "./EmergencyContacts";
import Button from "../ui/Button";
import { useState, useRef } from "react";
import { QrCode, Upload, X } from "lucide-react";

export default function PatientForm({ patient = null, mode = "create" }) {
  const isEdit = mode === "edit";

  const [qrPreview, setQrPreview] = useState(patient?.qrCode || null);
  const fileInputRef = useRef(null);

  const handleQrUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setQrPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleRemoveQr = () => {
    setQrPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <form className="space-y-8">
      {/* Patient Information */}
      <section className="rounded-xl border border-white/10 bg-zinc-950 p-6">
        <h3 className="mb-1 text-lg font-semibold text-white">
          Patient Information
        </h3>
        <p className="mb-6 text-sm text-zinc-400">
          {isEdit ? "Update the patient's details" : "Enter the details of the new patient"}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Full Name"
            required
            defaultValue={patient?.fullName}
          />
          <Select
            label="Gender"
            required
            defaultValue={patient?.gender?.toLowerCase()}
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
            ]}
          />
          <div>
            <label className="text-sm text-zinc-300">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              defaultValue={patient?.dob}
              className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white"
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Marital Status"
            defaultValue={patient?.maritalStatus?.toLowerCase()}
            options={[
              { label: "Single", value: "single" },
              { label: "Married", value: "married" },
            ]}
          />
          <Select
            label="Clinic"
            required
            defaultValue={patient?.clinic}
            options={[
              { label: "None", value: "" },
              { label: "Clinic 1", value: "1" },
              { label: "Clinic 2", value: "2" },
            ]}
          />
        </div>

        {/* Address */}
        <div className="mt-3">
          <label className="text-sm text-zinc-300">Address</label>
          <textarea
            name="address"
            rows="2"
            defaultValue={patient?.address}
            className="w-full rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Email Address" defaultValue={patient?.email} />
          <Input label="Phone Number" defaultValue={patient?.phone} />
        </div>

        {/* Social QR Code Upload */}
        <div className="mt-4">
          <label className="text-sm text-zinc-300 block mb-1">
            Social QR Code
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleQrUpload}
            className="hidden"
            id="qr-upload"
          />

          {!qrPreview ? (
            <label
              htmlFor="qr-upload"
              className="flex flex-col items-center justify-center gap-2 w-full rounded-lg border border-dashed border-white/20 bg-zinc-900 py-8 text-zinc-400 hover:border-white/40 hover:text-zinc-300 cursor-pointer transition-colors"
            >
              <QrCode className="h-8 w-8" />
              <span className="text-sm font-medium">Upload QR Code Image</span>
              <span className="text-xs text-zinc-500">PNG, JPG up to 10MB</span>
            </label>
          ) : (
            <div className="relative inline-flex flex-col items-center gap-2">
              <div className="relative rounded-lg overflow-hidden border border-white/10">
                <img
                  src={qrPreview}
                  alt="Social QR Code Preview"
                  className="h-40 w-40 object-contain bg-white p-2"
                />
                <button
                  type="button"
                  onClick={handleRemoveQr}
                  className="absolute top-1 right-1 rounded-full bg-zinc-800/90 p-1 text-zinc-300 hover:bg-red-500 hover:text-white transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <label
                htmlFor="qr-upload"
                className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white cursor-pointer transition-colors"
              >
                <Upload className="h-3.5 w-3.5" />
                Replace image
              </label>
            </div>
          )}
        </div>
      </section>

      <EmergencyContacts contacts={patient?.emergencyContacts} />
      <MedicalHistorySection
        allergies={patient?.allergies}
        medicalConditions={patient?.medicalConditions}
        historyNotes={patient?.historyNotes}
      />

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button variant="ghost" type="button">Cancel</Button>
        <Button type="submit">
          {isEdit ? "Save Changes" : "Create Patient"}
        </Button>
      </div>
    </form>
  );
}