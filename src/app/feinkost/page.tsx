import type { Metadata } from "next";
import Image from "next/image";
import { FEINKOST_PAGE, FEINKOST_HIGHLIGHTS, FEINKOST_USAGE } from "@/lib/data";
import { SectionHeading } from "@/components/atoms/section-heading";
import { LocationFeaturesGrid } from "@/components/organisms/location-features-grid";
import { CtaButton } from "@/components/atoms/cta-button";

export const metadata: Metadata = {
  title: FEINKOST_PAGE.title,
  description: FEINKOST_PAGE.description,
};

export default function FeinkostPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 shadow-2xl sm:py-28">
        <div className="absolute inset-0 z-0">
          <Image
            src={FEINKOST_PAGE.heroImage}
            alt={FEINKOST_PAGE.heroImageAlt}
            fill
            className="object-cover"
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={70}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {FEINKOST_PAGE.title}
            </h1>
            <h2 className="mt-4 text-xl font-medium text-white/90 sm:text-2xl">
              {FEINKOST_PAGE.subtitle}
            </h2>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Intro with image */}
        <section className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-5">
            <p className="text-sm font-medium tracking-widest text-black uppercase">
              {FEINKOST_PAGE.introLabel}
            </p>
            <p className="text-foreground/70 text-lg">{FEINKOST_PAGE.intro}</p>
            <p className="text-foreground/70 text-lg">
              {FEINKOST_PAGE.introSecond}
            </p>
          </div>
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={FEINKOST_PAGE.introImage}
              alt={FEINKOST_PAGE.introImageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={75}
              loading="lazy"
              decoding="async"
            />
          </div>
        </section>

        {/* Highlights */}
        <section className="mt-20 space-y-3">
          <p className="text-foreground/60 text-lg">
            {FEINKOST_PAGE.highlightsIntro}
          </p>
          <div className="max-h-95 overflow-y-auto rounded-2xl py-2 lg:max-h-none lg:border-0 lg:p-0">
            <LocationFeaturesGrid
              features={FEINKOST_HIGHLIGHTS}
              className="py-0"
            />
          </div>
        </section>

        {/* Quality section with image (reversed) */}
        <section className="mt-20 grid items-center gap-12 lg:grid-cols-2">
          <div className="relative order-1 aspect-4/3 overflow-hidden rounded-2xl shadow-lg lg:order-2">
            <Image
              src={FEINKOST_PAGE.sectionImage}
              alt={FEINKOST_PAGE.sectionImageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={75}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="order-2 space-y-5 lg:order-1">
            <p className="text-sm font-medium tracking-widest text-black uppercase">
              {FEINKOST_PAGE.sectionLabel}
            </p>
            <SectionHeading
              title={FEINKOST_PAGE.sectionTitle}
              className="mb-2"
            />
            <p className="text-foreground/70 text-lg">
              {FEINKOST_PAGE.sectionText}
            </p>
          </div>
        </section>

        {/* Quote / testimonial */}
        <section className="border-border/40 bg-pasta-gelb/20 mt-20 overflow-hidden rounded-2xl border shadow-md">
          <div className="grid items-center gap-8 sm:grid-cols-[minmax(0,220px)_1fr]">
            <div className="relative aspect-square sm:aspect-auto sm:h-full sm:min-h-64">
              <Image
                src={FEINKOST_PAGE.quoteImage}
                alt={FEINKOST_PAGE.quoteImageAlt}
                fill
                className="object-cover object-[50%_35%] sm:object-center"
                sizes="(max-width: 640px) 100vw, 220px"
                quality={75}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="p-6 sm:p-10">
              <p className="text-xl font-semibold tracking-tight">
                {FEINKOST_PAGE.quoteTitle}
              </p>
              <blockquote className="mt-4 border-l-4 border-black/30 pl-6">
                <p className="text-foreground/70 text-lg italic">
                  {FEINKOST_PAGE.quoteText}
                </p>
                <footer className="text-foreground/60 mt-3 text-sm font-medium">
                  — {FEINKOST_PAGE.quoteAuthor}
                </footer>
              </blockquote>
            </div>
          </div>
        </section>

        <p className="text-foreground/60 mt-16 text-lg">
          {FEINKOST_PAGE.transition}
        </p>

        {/* Usage */}
        <section className="mt-8 space-y-3">
          <p className="text-foreground/60 text-lg">
            {FEINKOST_PAGE.usageIntro}
          </p>
          <div className="max-h-95 overflow-y-auto rounded-2xl py-2 lg:max-h-none lg:border-0 lg:p-0">
            <LocationFeaturesGrid features={FEINKOST_USAGE} className="py-0" />
          </div>
        </section>

        <p className="text-foreground/60 mt-4 text-lg">{FEINKOST_PAGE.outro}</p>

        {/* Closing CTA */}
        <section className="bg-deep-black relative mt-20 overflow-hidden rounded-[36px] px-6 py-14 text-center shadow-[0_28px_90px_-40px_rgba(0,0,0,0.9)] sm:px-10 sm:py-16">
          <div
            className="absolute inset-0 bg-[radial-gradient(60%_85%_at_50%_0%,rgba(255,224,170,0.1),transparent)]"
            aria-hidden
          />
          <div className="relative z-10 mx-auto max-w-2xl text-white">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {FEINKOST_PAGE.ctaTitle}
            </h2>
            <p className="mt-4 text-lg text-white/80">
              {FEINKOST_PAGE.ctaText}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <CtaButton
                href="/aktuelle-kurse"
                label="Zu den Kochkursen"
                variant="brandSecondary"
                size="lg"
              />
              <CtaButton
                href="/ueber-mich"
                label="Über mich"
                variant="brandSecondary"
                size="lg"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
