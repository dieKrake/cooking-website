import { Card, CardTitle } from "@/components/ui/card";
import type { LocationFeature } from "@/types";

interface LocationFeatureCardProps {
  feature: LocationFeature;
}

export function LocationFeatureCard({ feature }: LocationFeatureCardProps) {
  return (
    <Card className="group border-border/30 bg-pasta-gelb relative flex min-h-20 items-center overflow-hidden border py-0 pr-5 pl-6 text-left shadow-md transition-all duration-300 hover:translate-x-1 hover:shadow-lg">
      {/* Dynamic pasta-gelb vertical bar, matching the project's divider design */}
      <span
        aria-hidden
        className="bg-deep-black/70 absolute top-0 bottom-0 left-0 w-[2px] origin-center scale-y-35 transition-transform duration-500 ease-out group-hover:scale-y-100"
      />
      <CardTitle className="text-deep-black flex h-full w-full items-center text-sm font-semibold tracking-tight sm:text-base">
        {feature.title}
      </CardTitle>
    </Card>
  );
}
