import { HeroSection } from "@/components/organisms/hero-section";
import { OfferGrid } from "@/components/organisms/offer-grid";
import { CourseSlider } from "@/components/organisms/course-slider";
import { ContactSection } from "@/components/organisms/contact-section";

export default function HomePage() {
  return (
    <>
      <HeroSection
        title="Culina – Gemeinsam kochen im Herzen von Aalen"
        subtitle="Familiäre Kochkurse, einzigartiges Catering und unvergessliche Feinkost-Genussmomente (ehemals Koch Klub am Kocher)"
        primaryCta={{ label: "Zu den Kursen", href: "/aktuelle-kurse" }}
        secondaryCta={{ label: "Location ansehen", href: "/eventlocation" }}
      />
      <OfferGrid />
      <CourseSlider />
      <ContactSection />
    </>
  );
}
