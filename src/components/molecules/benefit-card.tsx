import { CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Benefit } from "@/types";

interface BenefitCardProps {
  benefit: Benefit;
}

export function BenefitCard({ benefit }: BenefitCardProps) {
  const Icon = benefit.icon ?? CheckCircle2;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="text-primary h-5 w-5 shrink-0" aria-hidden="true" />
          {benefit.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground/70 text-sm">
        {benefit.description}
      </CardContent>
    </Card>
  );
}
