import { LocationFeatureCard } from "@/components/molecules/location-feature-card";
import { cn } from "@/lib/utils";
import type { LocationFeature } from "@/types";

interface LocationFeaturesGridProps {
  features: LocationFeature[];
  className?: string;
}

export function LocationFeaturesGrid({
  features,
  className,
}: LocationFeaturesGridProps) {
  return (
    <section className={cn("py-8", className)}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(140px,1fr))]">
        {features.map((feature) => (
          <LocationFeatureCard key={feature.title} feature={feature} />
        ))}
      </div>
    </section>
  );
}
