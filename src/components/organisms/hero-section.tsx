import { ReactNode } from "react";
import Image from "next/image";
import { CtaButton } from "@/components/atoms/cta-button";

interface HeroSectionProps {
  title: ReactNode;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  backgroundImage?: string;
}

export function HeroSection({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  backgroundImage,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="Hero Background"
            fill
            className="object-cover"
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={60}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-black/0" />
        </div>
      )}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center text-white">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 text-lg sm:text-xl">{subtitle}</p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <CtaButton
              href={primaryCta.href}
              label={primaryCta.label}
              size="lg"
              variant="brand"
            />
            {secondaryCta && (
              <CtaButton
                href={secondaryCta.href}
                label={secondaryCta.label}
                variant="brandSecondary"
                size="lg"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
