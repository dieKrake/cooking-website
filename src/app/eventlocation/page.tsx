import type { Metadata } from "next";
import { PLACEHOLDER_LOCATION_FEATURES } from "@/lib/placeholder-data";

export const metadata: Metadata = {
  title: "Eventlocation",
  description:
    "Miete unsere stilvolle Location für private oder geschäftliche Events.",
};

export default function EventlocationPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Deine Eventlocation</h1>
      <p className="mt-2 text-gray-600">
        Placeholder – Eventlocation. Hier entstehen: HeroSection, FeatureList,
        Gallery, InquiryForm.
      </p>

      <h2 className="mt-8 text-xl font-semibold">Ausstattung</h2>
      <ul className="mt-4 space-y-2">
        {PLACEHOLDER_LOCATION_FEATURES.map((feature) => (
          <li key={feature.title} className="border p-4 rounded">
            <strong>{feature.title}</strong> – {feature.description}
          </li>
        ))}
      </ul>

      <p className="mt-6 text-gray-600">
        Preise: ca. 85 – 130 € pro Person, je nach Kursleiter und Menü.
      </p>
    </div>
  );
}
