import type { Metadata } from "next";
import { CONTACT_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Nimm Kontakt mit uns auf – wir freuen uns auf deine Nachricht.",
};

export default function KontaktPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Kontaktiere uns</h1>
      <p className="mt-2 text-gray-600">
        Placeholder – Kontakt. Hier entstehen: ContactForm, ContactInfo, Map.
      </p>

      <div className="mt-8 space-y-2">
        <p>
          <strong>E-Mail:</strong> {CONTACT_INFO.email}
        </p>
        <p>
          <strong>Telefon:</strong> {CONTACT_INFO.phone}
        </p>
        <p>
          <strong>Adresse:</strong> {CONTACT_INFO.address.street},{" "}
          {CONTACT_INFO.address.zip} {CONTACT_INFO.address.city}
        </p>
      </div>
    </div>
  );
}
