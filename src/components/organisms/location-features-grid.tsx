import { SectionHeading } from "@/components/atoms/section-heading";
import { LocationFeatureCard } from "@/components/molecules/location-feature-card";
import type { LocationFeature } from "@/types";

interface LocationFeaturesGridProps {
  features: LocationFeature[];
}

export function LocationFeaturesGrid({ features }: LocationFeaturesGridProps) {
  return (
    <section className="py-12">
      <SectionHeading
        title="Ausstattung & Highlights"
        subtitle="Alles, was du für ein unvergessliches Event brauchst."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <LocationFeatureCard key={feature.title} feature={feature} />
        ))}
      </div>
    </section>
  );
}
