import type { Metadata } from "next";
import {
  PLACEHOLDER_GALLERY_IMAGES,
  PLACEHOLDER_LOCATION_FEATURES,
} from "@/lib/placeholder-data";
import { LocationGallery } from "@/components/molecules/location-gallery";
import { LocationFeaturesGrid } from "@/components/organisms/location-features-grid";
import { InquiryForm } from "@/components/organisms/inquiry-form";
import { CtaButton } from "@/components/atoms/cta-button";

export const metadata: Metadata = {
  title: "Eventlocation",
  description:
    "Miete unsere stilvolle Location für private oder geschäftliche Events in Wiesbaden.",
};

export default function EventlocationPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Unsere Eventlocation mitten in Aalen – Genussvolle Events in
          besonderer Atmosphäre
        </h1>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">
          Modernes Kochstudio für Firmenfeiern, private Events und gemeinsame
          Genussmomente
        </h2>
        <p className="text-foreground/60 mt-3 text-lg">
          Unser Kochstudio in Aalen verbindet moderne Ausstattung mit familiärer
          Atmosphäre und schafft den perfekten Rahmen für unvergessliche Events,
          Kochabende und Feiern. Ob Firmenevent, Geburtstag, Teamabend oder
          private Feier – unsere Eventlocation bietet Platz für bis zu 50
          Personen und lädt zum gemeinsamen Genießen und Erleben ein. Die helle,
          offene Raumgestaltung sorgt für eine einladende Atmosphäre, in der
          sich Gäste sofort wohlfühlen. Hochwertiges Küchenequipment von NEFF
          ermöglicht professionelle Kochkurse, Live-Cooking-Erlebnisse und
          kulinarische Events auf höchstem Niveau.
        </p>
      </div>
      <LocationGallery images={PLACEHOLDER_GALLERY_IMAGES} />
      <p className="text-foreground/60 mt-3 text-lg">
        Besonders beliebt ist unser Flying Buffet: Statt eines klassischen
        Buffets werden kleine, frisch zubereitete Speisen direkt serviert und
        flexibel im Raum angeboten. So entsteht eine lockere, kommunikative
        Atmosphäre, in der sich Genuss und Austausch ganz natürlich verbinden.
      </p>
      <p className="text-foreground/60 mt-3 text-lg">
        Unsere Eventlocation in Aalen eignet sich ideal für:
      </p>
      <LocationFeaturesGrid features={PLACEHOLDER_LOCATION_FEATURES} />
      <p className="text-foreground/60 mt-3 text-lg">
        Mit viel Liebe zum Detail schaffen wir einen Ort, an dem gutes Essen,
        gemeinsame Erlebnisse und echte Gastfreundschaft im Mittelpunkt stehen.
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
      <InquiryForm />
    </main>
  );
}
