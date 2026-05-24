import { Card, CardTitle } from "@/components/ui/card";
import type { LocationFeature } from "@/types";

interface LocationFeatureCardProps {
  feature: LocationFeature;
}

export function LocationFeatureCard({ feature }: LocationFeatureCardProps) {
  return (
    <Card className="flex min-h-24 items-center justify-center px-4 py-6 text-center">
      <CardTitle className="text-base font-semibold">{feature.title}</CardTitle>
    </Card>
  );
}
