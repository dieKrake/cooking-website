import { HeroSection } from "@/components/organisms/hero-section";
import { OfferGrid } from "@/components/organisms/offer-grid";
import { CourseSlider } from "@/components/organisms/course-slider";

export default function HomePage() {
  return (
    <>
      <HeroSection
        title="Willkommen im Kochatelier"
        subtitle="Kreative Kochkurse, private Events und Catering in familiärer Atmosphäre – mitten in Wiesbaden."
        primaryCta={{ label: "Zu den Kursen", href: "/aktuelle-kurse" }}
        secondaryCta={{ label: "Location ansehen", href: "/eventlocation" }}
      />
      <OfferGrid />
      <CourseSlider />
    </>
  );
}
