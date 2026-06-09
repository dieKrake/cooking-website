import { ReactNode } from "react";
import { CtaButton } from "@/components/atoms/cta-button";

interface HeroSectionProps {
  title: ReactNode;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function HeroSection({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: HeroSectionProps) {
  return (
    <section className="bg-butterweiss py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="text-foreground/60 mt-6 text-lg sm:text-xl">
            {subtitle}
          </p>
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
