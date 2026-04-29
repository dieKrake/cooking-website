import type { Metadata } from "next";

export const metadata: Metadata = { title: "Datenschutz" };

export default function DatenschutzPage() {
  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-3xl font-bold">Datenschutzerklärung</h1>
      <p className="mt-4 text-gray-600">
        Placeholder – Datenschutz. Hier folgt die vollständige
        Datenschutzerklärung gemäß DSGVO.
      </p>
    </div>
  );
}
