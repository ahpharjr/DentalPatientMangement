import { MapPin, Mail, Phone } from "lucide-react";
import Card from "../ui/Card";

export default function ContactInfoCard({ patient }) {
  return (
    <Card>
      <div className="mb-4 flex items-center gap-2">
        <MapPin className="h-4 w-4 text-zinc-400" />
        <div>
          <h3 className="text-sm font-medium text-white">
            Contact Information
          </h3>
          <p className="text-xs text-zinc-400">
            Address and contact details
          </p>
        </div>
      </div>

      <div className="space-y-3 text-sm text-zinc-300">
        <Field
          icon={MapPin}
          value={patient.address}
        />
        <Field
          icon={Mail}
          value={patient.email || "Not provided"}
        />
        <Field
          icon={Phone}
          value={patient.phone || "Not provided"}
        />
      </div>
    </Card>
  );
}

function Field({ icon: Icon, value }) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="mt-0.5 h-4 w-4 text-zinc-400" />
      <span>{value}</span>
    </div>
  );
}
