import Image from "next/image";
import { Heart, Utensils, Users } from "lucide-react";

const VALUES = [
  {
    icon: Heart,
    title: "Leidenschaft",
    description:
      "Kochen ist für mich Ausdruck von Fürsorge, Kreativität und echter Lebensfreude.",
  },
  {
    icon: Utensils,
    title: "Qualität",
    description:
      "Frische Zutaten, ehrliches Handwerk und Liebe zum Detail in jedem Gericht.",
  },
  {
    icon: Users,
    title: "Gemeinschaft",
    description:
      "Am Herd entstehen Gespräche, Freundschaften und gemeinsame Erinnerungen.",
  },
];

export function StorySection() {
  return (
    <div className="space-y-20">
      <section className="grid items-center gap-12 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl">
          <Image
            src="https://placehold.co/600x600?text=Fabry"
            alt="Fabry – Gründer von Culina"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="space-y-5">
          <div>
            <p className="text-primary text-sm font-medium tracking-widest uppercase">
              Meine Geschichte
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Von Rumänien nach Aalen
            </h2>
          </div>
          <p className="text-foreground/70">
            Mein Name ist Razvan George Pamfile, aber Freunde, Familie und viele
            Gäste nennen mich einfach „Fabry". Geboren und aufgewachsen bin ich
            in Rumänien – dort habe ich auch meine Leidenschaft fürs Kochen
            entdeckt und meine ersten Erfahrungen in der Küche gesammelt.
            Besonders die südliche und mediterrane Küche begeistert mich bis
            heute: frische Zutaten, ehrliche Gerichte und gemeinsames Genießen
            stehen für mich immer im Mittelpunkt.
          </p>
          <p className="text-foreground/70">
            2017 kam ich nach Deutschland und habe meinen Weg in der Gastronomie
            Schritt für Schritt aufgebaut. Vom Tellerwäscher bis zum Koch durfte
            ich alle Stationen kennenlernen und wertvolle Erfahrungen sammeln.
            Gerade diese Zeit hat mich geprägt, denn ich habe gelernt, wie
            wichtig Teamgeist, Qualität und echte Gastfreundschaft sind.
          </p>
        </div>
      </section>

      <section className="grid items-center gap-12 lg:grid-cols-2">
        <div className="order-2 space-y-5 lg:order-1">
          <div>
            <p className="text-primary text-sm font-medium tracking-widest uppercase">
              Mein Weg
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Erfahrung trifft Leidenschaft
            </h2>
          </div>
          <p className="text-foreground/70">
            Auch in Aalen konnte ich viele Erfahrungen sammeln – unter anderem
            bei Leib&Seele, in der Wilhelmshöhe und der Bierhalle. Später führte
            mich mein Weg nach Karlsruhe – erst ins Sternerestaurant „fine
            dining", und dann zu ilcesto, wo ich mein Wissen rund um Feinkost,
            hochwertige Lebensmittel und moderne Genusskonzepte weiter vertiefen
            konnte.
          </p>
          <p className="text-foreground/70">
            Heute lebe ich mit meiner Familie und meinen zwei Kindern in Aalen
            und freue mich, mit Culina einen Ort zu schaffen, an dem Menschen
            zusammenkommen, gemeinsam kochen und schöne Momente erleben können.
          </p>
          <p className="text-foreground/70">
            Mir ist besonders wichtig, dass sich meine Gäste wohlfühlen, Spaß
            haben und neben gutem Essen auch neue Ideen mit nach Hause nehmen.
            Ob kleine Tipps aus der Gastronomie, neue Rezeptideen oder besondere
            Geschmackserlebnisse – ich möchte Menschen für gutes Essen
            begeistern und zeigen, wie viel Freude gemeinsames Kochen machen
            kann.
          </p>
        </div>
        <div className="relative order-1 aspect-square overflow-hidden rounded-2xl lg:order-2">
          <Image
            src="https://placehold.co/600x600?text=Fabry+K%C3%BCche"
            alt="Fabry in der Küche bei Culina"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="text-center">
        <p className="text-foreground/70 mx-auto max-w-3xl text-lg italic">
          „Culina soll ein Ort sein, an dem Genuss, Gemeinschaft und familiäre
          Atmosphäre im Mittelpunkt stehen."
        </p>
      </section>
    </div>
  );
}
