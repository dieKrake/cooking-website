import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { CtaButton } from "@/components/atoms/cta-button";
import type { OfferCard as OfferCardType } from "@/types";

interface OfferCardProps {
  offer: OfferCardType;
}

export function OfferCard({ offer }: OfferCardProps) {
  return (
    <Card className="bg-butterweiss border-pasta-gelb/20 flex flex-col">
      <CardHeader>
        <CardTitle>{offer.title}</CardTitle>
        <CardDescription>{offer.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1" />
      <CardFooter>
        <CtaButton
          href={offer.ctaHref}
          label={offer.ctaLabel}
          variant="outline"
          size="sm"
        />
      </CardFooter>
    </Card>
  );
}
