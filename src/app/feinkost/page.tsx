import type { Metadata } from "next";
import { SectionHeading } from "@/components/atoms/section-heading";
import { LocationFeaturesGrid } from "@/components/organisms/location-features-grid";
import type { LocationFeature } from "@/types";

export const metadata: Metadata = {
  title: "Feinkost & Culina – Mediterraner Genuss in Premiumqualität",
  description:
    "Hochwertige Antipasti, Feinkost und Delikatessen von ilcesto bei Culina in Aalen.",
};

const FEINKOST_HIGHLIGHTS: LocationFeature[] = [
  { title: "Mediterrane Spezialitäten" },
  { title: "Hochwertige Öle & Essige" },
  { title: "Frische Antipasti & Delikatessen" },
  { title: "Biologische Zutaten" },
  { title: "Traditionelle Herstellung" },
  { title: "Kreative Genussmomente für zuhause" },
];

const FEINKOST_USAGE: LocationFeature[] = [
  { title: "Als Geschenkidee in Aalen" },
  { title: "Für Genießer & Feinschmecker" },
  { title: "Für besondere Abende zuhause" },
  { title: "Als Ergänzung zu Kochkursen & Events" },
  { title: "Für mediterranen Genuss im Alltag" },
];

export default function FeinkostPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Feinkost & Culina – Mediterraner Genuss in Premiumqualität
        </h1>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">
          Hochwertige Antipasti, Feinkost und Delikatessen von ilcesto
        </h2>
        <p className="text-foreground/60 mt-3 text-lg">
          Bei Culina steht Genuss nicht nur beim gemeinsamen Kochen im
          Mittelpunkt, sondern auch bei ausgewählten Feinkost-Produkten mit
          echter Qualität. Deshalb arbeiten wir mit ilcesto zusammen – einer
          Bio-Manufaktur, die seit vielen Jahren für mediterrane Feinkost,
          frische Antipasti und hochwertige Delikatessen steht.
        </p>
        <p className="text-foreground/60 mt-3 text-lg">
          Die Produkte von ilcesto überzeugen durch frische Verarbeitung,
          hochwertige biologische Zutaten und echte Handwerkskunst. Viele
          Antipasti, Oliven, Artischocken, Peperoni, Pestos und
          Feinkost-Spezialitäten werden wöchentlich frisch hergestellt und
          direkt verarbeitet – inspiriert von mediterraner Genusskultur und
          traditionellen Rezepturen.
        </p>
      </div>

      <p className="text-foreground/60 mt-3 text-lg">
        Bei unserer Feinkost in Aalen legen wir besonderen Wert auf:
      </p>
      <LocationFeaturesGrid features={FEINKOST_HIGHLIGHTS} />

      <section className="py-12">
        <SectionHeading title="Mediterrane Feinkost mit Qualität und Herkunft" />
        <p className="text-foreground/60 text-lg">
          Die Philosophie von ilcesto passt perfekt zu Culina: ehrliche
          Lebensmittel, frische Verarbeitung, nachhaltiges Denken und echter
          Geschmack statt Massenproduktion. Verarbeitet werden ausschließlich
          hochwertige Rohstoffe und ausgewählte Zutaten – mit viel Erfahrung,
          Fingerspitzengefühl und Leidenschaft für gutes Essen.
        </p>
      </section>

      <section className="py-12">
        <SectionHeading title="„Für mich zählt nicht nur die Feinkost selbst – sondern die Qualität bis ins kleinste Detail.“" />

        <h2 className="text-foreground/80 text-lg italic"></h2>
        <blockquote className="border-primary/30 border-l-4 pl-6">
          <p className="text-foreground/70 mt-4 text-lg italic">
            „Ich arbeite mit ilcesto, weil man die Qualität einfach schmeckt.
            Nicht nur bei den Antipasti und Delikatessen selbst, sondern auch
            bei den Ölen, Gewürzen und Zutaten, mit denen alles eingelegt und
            veredelt wird. Genau diese Liebe zum Produkt möchte ich auch meinen
            Gästen in Aalen weitergeben."
          </p>
          <footer className="text-foreground/60 mt-3 text-sm font-medium">
            — Fabry
          </footer>
        </blockquote>
      </section>

      <p className="text-foreground/60 text-lg">
        Ob mediterrane Antipasti, besondere Delikatessen, hochwertige Öle,
        Essige oder kreative Feinkost-Geschenkideen – bei Culina findest du
        ausgewählte Produkte für echte Genussmomente zuhause.
      </p>

      <p className="text-foreground/60 mt-6 text-lg">
        Unsere Feinkost-Produkte eignen sich perfekt:
      </p>
      <LocationFeaturesGrid features={FEINKOST_USAGE} />

      <p className="text-foreground/60 mt-4 text-lg">
        Mit unserer Feinkost von ilcesto möchten wir Menschen für gute
        Lebensmittel, bewussten Genuss und mediterrane Küche begeistern.
      </p>
    </main>
  );
}
