import { SectionHeading } from "@/components/atoms/section-heading";
import { BenefitCard } from "@/components/molecules/benefit-card";
import { GraduationCap, Heart, Gift, Users, Sparkles } from "lucide-react";
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
  return (
    <section className="py-12">
      <SectionHeading
        title="Gutschein-Ideen"
        subtitle="Unsere Gutscheine sind flexibel einlösbar:"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
