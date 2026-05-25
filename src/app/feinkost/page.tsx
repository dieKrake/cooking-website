import type { Metadata } from "next";
import {
  FEINKOST_PAGE,
  FEINKOST_HIGHLIGHTS,
  FEINKOST_USAGE,
} from "@/lib/placeholder-data";
import { SectionHeading } from "@/components/atoms/section-heading";
import { LocationFeaturesGrid } from "@/components/organisms/location-features-grid";

export const metadata: Metadata = {
  title: FEINKOST_PAGE.title,
  description: FEINKOST_PAGE.description,
};

export default function FeinkostPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-4">
        <h1 className="text-4xl font-bold tracking-tight">
          {FEINKOST_PAGE.title}
        </h1>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">
          {FEINKOST_PAGE.subtitle}
        </h2>
        <p className="text-foreground/60 mt-3 text-lg">{FEINKOST_PAGE.intro}</p>
        <p className="text-foreground/60 mt-3 text-lg">
          {FEINKOST_PAGE.introSecond}
        </p>
      </div>

      <p className="text-foreground/60 mt-3 text-lg">
        {FEINKOST_PAGE.highlightsIntro}
      </p>
      <LocationFeaturesGrid features={FEINKOST_HIGHLIGHTS} />

      <section className="py-12">
        <SectionHeading title={FEINKOST_PAGE.sectionTitle} />
        <p className="text-foreground/60 text-lg">
          {FEINKOST_PAGE.sectionText}
        </p>
      </section>

      <section className="py-12">
        <SectionHeading title={FEINKOST_PAGE.quoteTitle} />
        <blockquote className="border-primary/30 border-l-4 pl-6">
          <p className="text-foreground/70 text-lg italic">
            {FEINKOST_PAGE.quoteText}
          </p>
          <footer className="text-foreground/60 mt-3 text-sm font-medium">
            — {FEINKOST_PAGE.quoteAuthor}
          </footer>
        </blockquote>
      </section>

      <p className="text-foreground/60 text-lg">{FEINKOST_PAGE.transition}</p>

      <p className="text-foreground/60 mt-6 text-lg">
        {FEINKOST_PAGE.usageIntro}
      </p>
      <LocationFeaturesGrid features={FEINKOST_USAGE} />

      <p className="text-foreground/60 mt-4 text-lg">{FEINKOST_PAGE.outro}</p>
    </main>
  );
}
