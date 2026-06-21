import type { Metadata } from "next";
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
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-4">
        <h1 className="text-4xl font-bold tracking-tight">
          {EVENTLOCATION_PAGE.title}
        </h1>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">
          {EVENTLOCATION_PAGE.subtitle}
        </h2>
        <p className="text-foreground/60 mt-3 text-lg">
          {EVENTLOCATION_PAGE.intro}
        </p>
      </div>
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
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <CtaButton
          href="/aktuelle-kurse"
          label="Zu den Kochkursen"
          variant="outline"
          size="lg"
        />
        <CtaButton
          href="/gutscheine"
          label="Zu den Gutscheinen"
          variant="outline"
          size="lg"
        />
      </div>
      <ContactForm config={INQUIRY_FORM} />
    </main>
  );
}
