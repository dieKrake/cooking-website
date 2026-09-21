import type { Metadata } from "next";
import Image from "next/image";
import { CATERING_PAGE, CATERING_FEATURES, CATERING_STYLES } from "@/lib/data";
import { CtaButton } from "@/components/atoms/cta-button";
import { SectionHeading } from "@/components/atoms/section-heading";
import { BenefitCard } from "@/components/molecules/benefit-card";
import { ContactForm } from "@/components/organisms/contact-form";
import { CateringStylesCarousel } from "@/components/organisms/catering-styles-carousel";
import { LocationFeaturesGrid } from "@/components/organisms/location-features-grid";
import { CATERING_FORM } from "@/lib/form-configs";

export const metadata: Metadata = {
  title: CATERING_PAGE.title,
  description: CATERING_PAGE.description,
};

export default function CateringPage() {
  return (
    <main>
      <section className="relative flex min-h-96 items-center overflow-hidden py-16 shadow-2xl sm:min-h-110">
        <div className="absolute inset-0 z-0">
          <Image
            src={CATERING_PAGE.heroImage}
            alt={CATERING_PAGE.heroImageAlt}
            fill
            className="object-cover object-[50%_38%]"
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={75}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/45 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {CATERING_PAGE.title}
            </h1>
            <h2 className="mt-4 max-w-2xl text-xl font-medium text-white/90 sm:text-2xl">
              {CATERING_PAGE.subtitle}
            </h2>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="max-w-4xl">
          <p className="text-foreground/70 text-lg leading-relaxed">
            {CATERING_PAGE.intro}
          </p>
        </section>

        <section className="mt-20">
          <SectionHeading
            title={CATERING_PAGE.sectionTitle}
            subtitle={CATERING_PAGE.sectionSubtitle}
          />
          <div className="lg:hidden">
            <CateringStylesCarousel />
          </div>
          <div className="hidden gap-4 lg:grid lg:grid-cols-4">
            {CATERING_STYLES.map((style) => (
              <BenefitCard key={style.title} benefit={style} tone="light" />
            ))}
          </div>
        </section>

        <section className="mt-20 space-y-3">
          <p className="text-foreground/60 text-lg">
            {CATERING_PAGE.featuresIntro}
          </p>
          <div className="max-h-[380px] overflow-y-auto rounded-2xl py-2 lg:max-h-none lg:border-0 lg:p-0">
            <LocationFeaturesGrid
              features={CATERING_FEATURES}
              className="py-0"
            />
          </div>
        </section>

        <section className="bg-deep-black relative mt-20 overflow-hidden rounded-[36px] px-6 py-14 text-center shadow-[0_28px_90px_-40px_rgba(0,0,0,0.9)] sm:px-10 sm:py-16">
          <div
            className="absolute inset-0 bg-[radial-gradient(60%_85%_at_50%_0%,rgba(255,224,170,0.1),transparent)]"
            aria-hidden
          />
          <div className="relative z-10 mx-auto max-w-2xl text-white">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {CATERING_PAGE.ctaTitle}
            </h2>
            <p className="mt-4 text-lg text-white/80">
              {CATERING_PAGE.ctaText}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
              <CtaButton
                href="#catering-form"
                label="Catering anfragen"
                variant="brandSecondary"
                size="lg"
              />
              <CtaButton
                href="/aktuelle-kurse"
                label="Zu den Kochkursen"
                variant="brandSecondary"
                size="lg"
              />
            </div>
          </div>
        </section>
      </div>

      <ContactForm config={CATERING_FORM} id="catering-form" />
    </main>
  );
}
