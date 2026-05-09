import type { Metadata } from "next";
import { StorySection } from "@/components/organisms/story-section";

export const metadata: Metadata = {
  title: "Über mich",
  description:
    "Erfahre mehr über die Gründerin und die Vision hinter dem Kochatelier.",
};

export default function UeberUnsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Über mich</h1>
        <p className="text-foreground/60 mt-3 text-lg">
          Das Kochatelier ist mehr als ein Kochkursbetrieb – es ist ein Raum für
          Begegnung, Genuss und echte Handwerkskunst.
        </p>
      </div>
      <StorySection />
    </main>
  );
}
