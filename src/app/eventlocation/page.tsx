import type { Metadata } from "next";
import { PLACEHOLDER_LOCATION_FEATURES } from "@/lib/placeholder-data";
import { LocationFeaturesGrid } from "@/components/organisms/location-features-grid";
import { InquiryForm } from "@/components/organisms/inquiry-form";

export const metadata: Metadata = {
  title: "Eventlocation",
  description:
    "Miete unsere stilvolle Location für private oder geschäftliche Events in Wiesbaden.",
};

export default function EventlocationPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Deine Eventlocation
        </h1>
        <p className="text-foreground/60 mt-3 text-lg">
          110 m² mitten in Wiesbaden – für Geburtstage, Teamevents, Hochzeiten
          und mehr. Bis zu 25 Personen, vollständig ausgestattet.
        </p>
      </div>
      <LocationFeaturesGrid features={PLACEHOLDER_LOCATION_FEATURES} />
      <InquiryForm />
    </main>
  );
}
