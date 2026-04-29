import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Erfahre mehr über die Gründerin und die Vision hinter dem Kochatelier.",
};

export default function UeberUnsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Über uns</h1>
      <p className="mt-4 text-gray-600">
        Placeholder – Über uns. Hier entsteht die StorySection mit der
        Gründer-Geschichte.
      </p>
      <p className="mt-4">
        Das Kochatelier ist mehr als ein Kochkursbetrieb – es ist ein Raum für
        Begegnung, Genuss und Veränderung. Hier teilen wir Wissen über gesunde
        Ernährung, entdecken altes Handwerk neu und verbinden Menschen durch
        gutes Essen.
      </p>
    </div>
  );
}
