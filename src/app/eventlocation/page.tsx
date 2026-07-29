import type { Metadata } from "next";
import Image from "next/image";
import {
  EVENTLOCATION_PAGE,
  GALLERY_IMAGES,
  LOCATION_FEATURES,
} from "@/lib/data";
import { LocationGallery } from "@/components/molecules/location-gallery";
import { LocationFeaturesGrid } from "@/components/organisms/location-features-grid";
import { ContactForm } from "@/components/organisms/contact-form";
import { INQUIRY_FORM } from "@/lib/form-configs";
import { CtaButton } from "@/components/atoms/cta-button";

export const metadata: Metadata = {
  title: EVENTLOCATION_PAGE.title,
  description: EVENTLOCATION_PAGE.description,
};

export default function EventlocationPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 shadow-2xl sm:py-28">
        <div className="absolute inset-0 z-0">
          <Image
            src={EVENTLOCATION_PAGE.heroImage}
            alt={EVENTLOCATION_PAGE.heroImageAlt}
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
              {EVENTLOCATION_PAGE.title}
            </h1>
            <h2 className="mt-4 text-xl font-medium text-white/90 sm:text-2xl">
              {EVENTLOCATION_PAGE.subtitle}
            </h2>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-foreground/60 text-lg">{EVENTLOCATION_PAGE.intro}</p>
        <LocationGallery images={GALLERY_IMAGES} />
        <p className="text-foreground/60 mt-3 text-lg">
          {EVENTLOCATION_PAGE.flyingBuffet}
        </p>
        <p className="text-foreground/60 mt-3 text-lg">
          {EVENTLOCATION_PAGE.featuresIntro}
        </p>
        <LocationFeaturesGrid features={LOCATION_FEATURES} />
        <p className="text-foreground/60 mt-3 text-lg">
          {EVENTLOCATION_PAGE.outro}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <CtaButton
            href="/aktuelle-kurse"
            label="Zu den Kochkursen"
            variant="brandSecondary"
            size="lg"
          />
          <CtaButton
            href="/feinkost"
            label="Zur Feinkost"
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
        <ContactForm config={INQUIRY_FORM} />
      </div>
    </main>
  );
}
