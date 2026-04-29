import type { Metadata } from "next";

export const metadata: Metadata = { title: "Impressum" };

export default function ImpressumPage() {
  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-3xl font-bold">Impressum</h1>
      <p className="mt-4 text-gray-600">
        Placeholder – Impressum. Hier folgen die vollständigen Impressum-Angaben
        gemäß § 5 TMG.
      </p>
    </div>
  );
}
