import Input from "../ui/Input";
import Button from "../ui/Button";
import { Trash2, Plus } from "lucide-react";
import { useState } from "react";

export default function EmergencyContacts() {
  const [contacts, setContacts] = useState([{ id: 1 }]);

  return (
    <section className="rounded-xl border border-white/10 bg-zinc-950 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          Relatives' Contact Information
        </h3>
        <Button
          variant="ghost"
          onClick={() =>
            setContacts([...contacts, { id: Date.now() }])
          }
        >
          <Plus className="mr-1 h-4 w-4" /> Add Contact
        </Button>
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
            <button
              onClick={() =>
                setContacts(contacts.filter((x) => x.id !== c.id))
              }
              className="flex items-end text-red-500"
            >
              <Trash2 className="h-4 w-4" /> Remove
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
