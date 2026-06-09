import Image from "next/image";
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
    <Card className="bg-butterweiss border-pasta-gelb/20 group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={offer.image}
          alt={offer.imageAlt || offer.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader>
        <CardTitle>{offer.title}</CardTitle>
        <CardDescription>{offer.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1" />
      <CardFooter>
        <CtaButton
          href={offer.ctaHref}
          label={offer.ctaLabel}
          variant="brand"
          size="sm"
        />
      </CardFooter>
    </Card>
  );
}
