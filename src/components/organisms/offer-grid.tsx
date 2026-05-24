import { SectionHeading } from "@/components/atoms/section-heading";
import { OfferCard } from "@/components/molecules/offer-card";
import { PLACEHOLDER_OFFER_CARDS } from "@/lib/placeholder-data";

export function OfferGrid() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Entdecke Kulinarik neu"
          subtitle="Kochkurse, Catering und hochwertige Feinkostartikel direkt aus Aalen und der Region"
          centered
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PLACEHOLDER_OFFER_CARDS.map((offer) => (
            <OfferCard key={offer.title} offer={offer} />
          ))}
        </div>
      </div>
    </section>
  );
}
