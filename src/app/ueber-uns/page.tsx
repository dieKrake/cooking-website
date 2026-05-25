import type { Metadata } from "next";
import { UEBER_MICH_PAGE } from "@/lib/data";
import { StorySection } from "@/components/organisms/story-section";

export const metadata: Metadata = {
  title: UEBER_MICH_PAGE.metaTitle,
  description: UEBER_MICH_PAGE.description,
};

export default function UeberUnsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">
          {UEBER_MICH_PAGE.title}
        </h1>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">
          {UEBER_MICH_PAGE.subtitle}
        </h2>
      </div>
      <StorySection />
    </main>
  );
}
