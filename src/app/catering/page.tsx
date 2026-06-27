import type { Metadata } from "next";
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
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-4">
        <h1 className="text-4xl font-bold tracking-tight">
          {CATERING_PAGE.title}
        </h1>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">
          {CATERING_PAGE.subtitle}
        </h2>
        <p className="text-foreground/60 mt-3 text-lg">{CATERING_PAGE.intro}</p>
      </div>
      <section className="py-12">
        <SectionHeading title={CATERING_PAGE.sectionTitle} />
        <div className="lg:hidden">
          <CateringStylesCarousel />
        </div>
        <div className="hidden gap-4 lg:grid lg:grid-cols-4">
          {CATERING_STYLES.map((style) => (
            <BenefitCard key={style.title} benefit={style} />
          ))}
        </div>
      </section>
      <section className="mt-4 space-y-3">
        <p className="text-foreground/60 text-lg">
          {CATERING_PAGE.featuresIntro}
        </p>
        <div className="max-h-[380px] overflow-y-auto rounded-2xl py-2 lg:max-h-none lg:border-0 lg:p-0">
          <LocationFeaturesGrid features={CATERING_FEATURES} className="py-0" />
        </div>
      </section>
      <p className="text-foreground/60 mt-3 text-lg">{CATERING_PAGE.outro}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <CtaButton
          href="/aktuelle-kurse"
          label="Zu den Kochkursen"
          variant="brandSecondary"
          size="lg"
        />
        <CtaButton
          href="/gutscheine"
          label="Zu den Gutscheinen"
          variant="ghost"
          size="lg"
          className="bg-eisblau text-deep-black hover:bg-eisblau/80! hover:text-deep-black! border-white/25"
        />
      </div>
      <ContactForm config={CATERING_FORM} />
    </main>
  );
}
