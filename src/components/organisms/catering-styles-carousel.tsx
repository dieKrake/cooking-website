"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { BenefitCard } from "@/components/molecules/benefit-card";
import { CATERING_STYLES } from "@/lib/data";

export function CateringStylesCarousel() {
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

  if (!CATERING_STYLES.length) return null;

  return (
    <div className="relative -mx-4 overflow-hidden sm:-mx-6">
      <div
        ref={scrollRef}
        className="ml-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4"
      >
        {CATERING_STYLES.map((style) => (
          <div
            key={style.title}
            className="w-72 shrink-0 snap-start sm:w-80"
            aria-label={style.title}
          >
            <BenefitCard benefit={style} className="h-full" />
          </div>
        ))}
      </div>
      <div
        aria-hidden
        className="from-butterweiss to-butterweiss/0 pointer-events-none absolute inset-y-0 left-0 w-6 bg-linear-to-r transition-opacity duration-500"
        style={{ opacity: canScrollLeft ? 1 : 0 }}
      />
      <div
        aria-hidden
        className="from-butterweiss to-butterweiss/0 pointer-events-none absolute inset-y-0 right-0 w-6 bg-linear-to-l transition-opacity duration-500"
        style={{ opacity: canScrollRight ? 1 : 0 }}
      />
    </div>
  );
}
