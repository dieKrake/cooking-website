import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catering",
  description:
    "Authentisches Catering aus aller Welt für dein besonderes Event.",
};

export default function CateringPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Catering aus aller Welt</h1>
      <p className="mt-4 text-gray-600">
        Placeholder – Catering. Hier entstehen: HeroSection, Beschreibung,
        CateringForm.
      </p>
      <p className="mt-4">
        Ob orientalisch, asiatisch, mediterran oder moderne Gesundheitsküche –
        unsere Köche bringen ihre Herkunft und ihr Wissen mit auf den Teller.
      </p>
    </div>
  );
}
