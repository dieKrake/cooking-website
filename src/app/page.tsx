import Image from "next/image";
import { HeroSection } from "@/components/organisms/hero-section";
import { OfferGrid } from "@/components/organisms/offer-grid";
import { CourseSlider } from "@/components/organisms/course-slider";
import { ContactSection } from "@/components/organisms/contact-section";

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
              className="h-auto w-[600px] object-contain sm:w-[700px] lg:w-[800px]"
              style={{ height: "auto" }}
              priority
            />
          </span>
        }
        subtitle="Familiäre Kochkurse, einzigartiges Catering und unvergessliche Feinkost-Genussmomente"
        primaryCta={{ label: "Zu den Kursen", href: "/aktuelle-kurse" }}
        secondaryCta={{ label: "Location ansehen", href: "/eventlocation" }}
        backgroundImage="/images/Tomate-Culina.webp"
      />
      <OfferGrid />
      <CourseSlider />
      <ContactSection />
    </>
  );
}
