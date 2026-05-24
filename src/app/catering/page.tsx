import type { Metadata } from "next";
import {
  PLACEHOLDER_CATERING_FEATURES,
  PLACEHOLDER_CATERING_STYLES,
  PLACEHOLDER_LOCATION_FEATURES,
} from "@/lib/placeholder-data";
import { SectionHeading } from "@/components/atoms/section-heading";
import { BenefitCard } from "@/components/molecules/benefit-card";
import { CateringForm } from "@/components/organisms/catering-form";
import { LocationFeaturesGrid } from "@/components/organisms/location-features-grid";
import { CtaButton } from "@/components/atoms/cta-button";

export const metadata: Metadata = {
  title: "Catering",
  description: "Catering in Aalen – Frisch, regional und mit Liebe zum Genuss",
};

export default function CateringPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Catering in Aalen – Frisch, regional und mit Liebe zum Genuss
        </h1>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">
          Kulinarisches Catering für Events, Firmenfeiern und besondere Anlässe
        </h2>
        <p className="text-foreground/60 mt-3 text-lg">
          Mit unserem Catering bringen wir hochwertige, kreative und frisch
          zubereitete Küche direkt zu deinem Event. Ob Firmenfeier, Geburtstag,
          Business-Lunch oder private Veranstaltung – Culina bietet eine
          vielseitige Auswahl an Speisen, Snacks und Getränken für genussvolle
          Momente in besonderer Atmosphäre. Unsere Küche verbindet regionale
          Zutaten mit mediterranen Einflüssen, gutbürgerlichen Klassikern und
          modernen, kreativen Gerichten. Dabei legen wir besonderen Wert auf
          frische Produkte, hochwertige Qualität und eine abwechslungsreiche
          Auswahl für jeden Geschmack.
        </p>
      </div>
      <section className="py-12">
        <SectionHeading
          title="Unsere Küchenwelten"
          subtitle="Für jeden Anlass die passende kulinarische Welt."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PLACEHOLDER_CATERING_STYLES.map((style) => (
            <BenefitCard key={style.title} benefit={style} />
          ))}
        </div>
      </section>
      <p className="text-foreground/60 mt-3 text-lg">
        Unsere Eventlocation in Aalen eignet sich ideal für:
      </p>
      <LocationFeaturesGrid features={PLACEHOLDER_CATERING_FEATURES} />
      <p className="text-foreground/60 mt-3 text-lg">
        Mit viel Leidenschaft fürs Kochen und einem Gespür für Gastfreundschaft
        schaffen wir Catering-Erlebnisse, die in Erinnerung bleiben.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <CtaButton
          href="/aktuelle-kurse"
          label="Zu den Kochkursen"
          variant="outline"
          size="lg"
        />
        <CtaButton
          href="/gutscheine"
          label="Zu den Gutscheinen"
          variant="outline"
          size="lg"
        />
      </div>
      <CateringForm />
    </main>
  );
}
