import { CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Benefit } from "@/types";

interface BenefitCardProps {
  benefit: Benefit;
}

export function BenefitCard({ benefit }: BenefitCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          {benefit.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-foreground/70">
        {benefit.description}
      </CardContent>
    </Card>
  );
}
