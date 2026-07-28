import Image from "next/image";
import { HeroSection } from "@/components/organisms/hero-section";
import { OfferGrid } from "@/components/organisms/offer-grid";
import { CourseSlider } from "@/components/organisms/course-slider";
import { EventTeaser } from "@/components/organisms/event-teaser";
import { ContactForm } from "@/components/organisms/contact-form";
import { CONTACT_FORM } from "@/lib/form-configs";

export default function HomePage() {
  return (
    <>
      <HeroSection
        title={
          <span className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            <Image
              src="/images/Culina-Logo.svg"
              alt="Culina"
              width={200}
              height={60}
              className="h-auto w-150 object-contain invert sm:w-175 lg:w-200"
              style={{ height: "auto" }}
              priority
            />
          </span>
        }
        subtitle="Familiäre Kochkurse, einzigartige Kulinarik und unvergessliche Feinkost-Genussmomente"
        primaryCta={{ label: "Zu den Kursen", href: "/aktuelle-kurse" }}
        secondaryCta={{ label: "Location ansehen", href: "/eventlocation" }}
        backgroundImage="/images/header.jpeg"
        mobileBackgroundImage="/images/header-mobile.jpeg"
      />
      <EventTeaser />
      <OfferGrid />
      <ContactForm config={CONTACT_FORM} id="kontakt" />
    </>
  );
}
