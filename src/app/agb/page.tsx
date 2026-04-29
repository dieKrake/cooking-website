import type { Metadata } from "next";

export const metadata: Metadata = { title: "AGB" };

export default function AgbPage() {
  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-3xl font-bold">Allgemeine Geschäftsbedingungen</h1>
      <p className="mt-4 text-gray-600">
        Placeholder – AGB. Hier folgen die vollständigen AGB.
      </p>
    </div>
  );
}
