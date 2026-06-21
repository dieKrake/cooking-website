import { SectionHeading } from "@/components/atoms/section-heading";
import { OfferCard } from "@/components/molecules/offer-card";
import { PLACEHOLDER_OFFER_CARDS } from "@/lib/data";

export function OfferGrid() {
  return (
    <section className="to-deep-black text-pure-white bg-linear-to-b from-black py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Entdecke Kulinarik neu"
          subtitle="Kochkurse, Catering und hochwertige Feinkostartikel direkt aus Aalen und der Region"
          centered
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {PLACEHOLDER_OFFER_CARDS.map((offer, index) => (
            <OfferCard key={offer.title} offer={offer} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
