import type { Metadata } from "next";
import { PLACEHOLDER_CATERING_STYLES } from "@/lib/placeholder-data";
import { SectionHeading } from "@/components/atoms/section-heading";
import { BenefitCard } from "@/components/molecules/benefit-card";
import { CateringForm } from "@/components/organisms/catering-form";

export const metadata: Metadata = {
  title: "Catering",
  description:
    "Authentisches Catering aus aller Welt für dein besonderes Event in Wiesbaden.",
};

export default function CateringPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Catering aus aller Welt
        </h1>
        <p className="text-foreground/60 mt-3 text-lg">
          Ob orientalisch, asiatisch, mediterran oder moderne Gesundheitsküche –
          unsere Köche bringen ihre Herkunft und ihr Handwerk direkt zu deinem
          Event.
        </p>
      </div>
      <section className="py-12">
        <SectionHeading
          title="Unsere Küchen"
          subtitle="Für jeden Anlass die passende kulinarische Welt."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PLACEHOLDER_CATERING_STYLES.map((style) => (
            <BenefitCard key={style.title} benefit={style} />
          ))}
        </div>
      </section>
      <CateringForm />
    </main>
  );
}
