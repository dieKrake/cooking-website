import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LocationFeature } from "@/types";

interface LocationFeatureCardProps {
  feature: LocationFeature;
}

export function LocationFeatureCard({ feature }: LocationFeatureCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{feature.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-foreground/70">
        {feature.description}
      </CardContent>
    </Card>
  );
}
