import Image from "next/image";
import { Heart, Leaf, Users } from "lucide-react";

const VALUES = [
  {
    icon: Heart,
    title: "Leidenschaft",
    description: "Kochen ist für mich mehr als Nahrungszubereitung – es ist Ausdruck von Fürsorge und Kreativität.",
  },
  {
    icon: Leaf,
    title: "Nachhaltigkeit",
    description: "Saisonale, regionale Zutaten und ein bewusster Umgang mit Ressourcen sind mir wichtig.",
  },
  {
    icon: Users,
    title: "Gemeinschaft",
    description: "Am Herd entstehen Gespräche, Freundschaften und gemeinsame Erinnerungen.",
  },
];

export function StorySection() {
  return (
    <div className="space-y-20">
      <section className="grid items-center gap-12 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl">
          <Image
            src="https://placehold.co/600x600?text=Gründerin"
            alt="Gründerin des Kochateliers"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="space-y-5">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Meine Geschichte
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Hallo, ich bin Sandra.
            </h2>
          </div>
          <p className="text-foreground/70">
            Ich bin in einer Familie aufgewachsen, in der die Küche immer der Mittelpunkt
            des Hauses war. Schon als Kind habe ich verstanden: Am Herd passiert Magie.
            Aus einfachen Zutaten entsteht etwas, das Menschen zusammenbringt.
          </p>
          <p className="text-foreground/70">
            Nach Jahren als Köchin in verschiedenen Restaurants habe ich 2019 das
            Kochatelier in Wiesbaden gegründet – einen Ort, an dem jeder kochen lernen
            kann. Egal ob Anfänger oder Fortgeschrittener, ob allein, mit Freunden oder
            als Team.
          </p>
          <p className="text-foreground/70">
            Meine Kurse leben von echtem Handwerk, frischen Produkten und der Überzeugung,
            dass gutes Essen keine Raketenwissenschaft ist – sondern Übung, Neugier und
            ein bisschen Mut.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mb-8 text-2xl font-bold tracking-tight">Meine Werte</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {VALUES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col gap-3 rounded-xl border p-6">
              <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
              <p className="font-semibold">{title}</p>
              <p className="text-sm text-foreground/70">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
