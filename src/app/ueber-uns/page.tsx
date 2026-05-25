import type { Metadata } from "next";
import { StorySection } from "@/components/organisms/story-section";

export const metadata: Metadata = {
  title: "Über mich – Fabry",
  description:
    "Kochen bedeutet für mich Gemeinschaft, Genuss und Menschen zusammenzubringen.",
};

export default function UeberUnsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Nenn mich einfach Fabry
        </h1>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">
          Kochen bedeutet für mich Gemeinschaft, Genuss und Menschen
          zusammenzubringen
        </h2>
      </div>
      <StorySection />
    </main>
  );
}
