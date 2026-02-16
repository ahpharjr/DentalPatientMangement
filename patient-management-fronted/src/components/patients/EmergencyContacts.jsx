import Input from "../ui/Input";
import { useState } from "react";

export default function EmergencyContacts() {
  const [contacts, setContacts] = useState([{ id: 1 }]);

  return (
    <section className="rounded-xl border border-white/10 bg-zinc-950 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          Relatives' Contact Information
        </h3>
      </div>

      <div className="space-y-4">
        {contacts.map((c) => (
          <div
            key={c.id}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <Input label="Name" />
            <Input label="Contact Number" />
            <Input label="Relationship" />
          </div>
        ))}
      </div>
    </section>
  );
}
