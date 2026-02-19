import { MapPin, Mail, Phone, QrCode, X, ZoomIn } from "lucide-react";
import { useState } from "react";
import Card from "../ui/Card";

export default function ContactInfoCard({ patient }) {
  const [qrOpen, setQrOpen] = useState(false);

  return (
    <>
      <Card>
        <div className="mb-4 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-zinc-400" />
          <div>
            <h3 className="text-sm font-medium text-white">
              Contact Information
            </h3>
            <p className="text-xs text-zinc-400">Address and contact details</p>
          </div>
        </div>

        {/* Content row: fields on left, QR on right */}
        <div className="flex items-start justify-between gap-4">
          {/* Left: contact fields */}
          <div className="space-y-3 text-sm text-zinc-300 flex-1">
            <Field icon={MapPin} value={patient.address} />
            <Field icon={Mail} value={patient.email || "Not provided"} />
            <Field icon={Phone} value={patient.phone || "Not provided"} />
          </div>

          {/* Right: QR Code */}
          {patient.qrCode && (
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <button
                onClick={() => setQrOpen(true)}
                className="group relative rounded-lg overflow-hidden border border-white/10 hover:border-white/30 transition-colors"
                title="Click to view full size"
              >
                <img
                  src={patient.qrCode}
                  alt="Social QR Code"
                  className="h-24 w-24 object-contain bg-white p-1.5"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="h-5 w-5 text-white" />
                </div>
              </button>
              <span className="flex items-center gap-1 text-xs text-zinc-500">
                <QrCode className="h-3 w-3" />
                Social QR
              </span>
            </div>
          )}
        </div>
      </Card>

      {/* Fullscreen Modal */}
      {qrOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setQrOpen(false)}
        >
          <div
            className="relative flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setQrOpen(false)}
              className="absolute -top-10 right-0 rounded-full p-1.5 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="rounded-2xl border border-white/10 bg-white p-6 shadow-2xl">
              <img
                src={patient.qrCode}
                alt="Social QR Code"
                className="h-64 w-64 object-contain"
              />
            </div>

            <p className="text-sm text-zinc-400">
              {patient.fullName}'s Social QR Code
            </p>
            <p className="text-xs text-zinc-600">Click outside to close</p>
          </div>
        </div>
      )}
    </>
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