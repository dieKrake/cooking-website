"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { SectionHeading } from "@/components/atoms/section-heading";
import { OfferCard } from "@/components/molecules/offer-card";
import { PLACEHOLDER_OFFER_CARDS } from "@/lib/data";

export function OfferGrid() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 32);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 32);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Entdecke Kulinarik neu"
          subtitle="Kochkurse, Live-Events und hochwertige Feinkostartikel direkt aus Aalen und der Region"
          centered
        />
        <div className="relative lg:-mx-8 lg:overflow-hidden">
          <div
            ref={scrollRef}
            className="flex flex-col items-center gap-6 lg:snap-x lg:snap-mandatory lg:flex-row lg:items-stretch lg:gap-8 lg:overflow-x-auto lg:px-8 lg:pb-6"
          >
            {PLACEHOLDER_OFFER_CARDS.map((offer, index) => (
              <div
                key={offer.title}
                className="w-full max-w-125 lg:w-110 lg:max-w-none lg:shrink-0 lg:snap-start xl:w-120"
              >
                <OfferCard offer={offer} index={index} />
              </div>
            ))}
          </div>
          <div
            aria-hidden
            className="from-butterweiss to-butterweiss/0 pointer-events-none absolute inset-y-0 left-0 hidden w-10 bg-linear-to-r transition-opacity duration-500 lg:block"
            style={{ opacity: canScrollLeft ? 1 : 0 }}
          />
          <div
            aria-hidden
            className="from-butterweiss to-butterweiss/0 pointer-events-none absolute inset-y-0 right-0 hidden w-10 bg-linear-to-l transition-opacity duration-500 lg:block"
            style={{ opacity: canScrollRight ? 1 : 0 }}
          />
        </div>
      </div>
    </section>
  );
}
