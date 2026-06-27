"use client";

import { SectionHeading } from "@/components/atoms/section-heading";
import { BenefitCard } from "@/components/molecules/benefit-card";
import { GraduationCap, Heart, Gift, Users, Sparkles } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import type { Benefit } from "@/types";

const VOUCHER_IDEAS: Benefit[] = [
  {
    title: "Als Kochkurs-Gutschein",
    description:
      "Das perfekte Geschenk für alle, die gerne kochen, genießen und Neues entdecken.",
    icon: GraduationCap,
  },
  {
    title: "Geschenkidee für Paare & Freunde",
    description:
      "Gemeinsam kochen, lachen und genießen – ein Erlebnis, das verbindet.",
    icon: Heart,
  },
  {
    title: "Kulinarische Erlebnisse verschenken",
    description:
      "Ideal für Geburtstage, Weihnachten, Jubiläen oder besondere Anlässe.",
    icon: Gift,
  },
  {
    title: "Gutscheine für Teamevents & Firmen",
    description:
      "Gemeinsame Genussmomente als besondere Aufmerksamkeit für Mitarbeitende oder Kunden.",
    icon: Users,
  },
  {
    title: "Flexible Wertgutscheine",
    description:
      "Individuell einlösbar für Kochkurse, Events, Catering oder Feinkost-Produkte bei Culina.",
    icon: Sparkles,
  },
];

export function VoucherIdeas() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 24);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 24);
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
    <section className="py-12">
      <SectionHeading
        title="Gutschein-Ideen"
        subtitle="Unsere Gutscheine sind flexibel einlösbar:"
      />
      <div className="lg:hidden">
        <div className="relative -mx-4 overflow-hidden sm:-mx-6">
          <div
            ref={scrollRef}
            className="ml-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4"
          >
            {VOUCHER_IDEAS.map((idea) => (
              <div
                key={idea.title}
                className="w-72 shrink-0 snap-start sm:w-80"
                aria-label={idea.title}
              >
                <BenefitCard benefit={idea} className="h-full min-h-[240px]" />
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
      </div>
      <div className="hidden gap-4 lg:grid lg:grid-cols-3">
        {VOUCHER_IDEAS.map((idea) => (
          <BenefitCard key={idea.title} benefit={idea} />
        ))}
      </div>
      <p className="text-foreground/60 mt-8 text-lg">
        Unsere Gutscheine lassen sich flexibel einsetzen und sind eine stilvolle
        Geschenkidee für alle, die gemeinsame Erlebnisse mehr schätzen als
        klassische Geschenke.
      </p>
    </section>
  );
}
