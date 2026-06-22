"use client";

import { ReactNode, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { CtaButton } from "@/components/atoms/cta-button";
import { cn } from "@/lib/utils";

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
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll within the hero section itself
  const { scrollY } = useScroll();

  // Create smooth parallax offsets
  // Background moves down (positive Y) slightly slower as we scroll down to offset normal movement
  const yBg = useTransform(scrollY, [0, 800], [0, 160]);

  // Text container moves down slightly to create a layered depth effect
  const yText = useTransform(scrollY, [0, 800], [0, 40]);

  // Text fades out dezent as you scroll down
  const opacityText = useTransform(scrollY, [0, 600], [1, 0.5]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden py-16 sm:py-24"
    >
      {backgroundImage && (
        <motion.div
          className="absolute inset-0 z-0 scale-110"
          style={{ y: yBg }}
        >
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
          <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/25 to-black/60" />
        </motion.div>
      )}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ y: yText, opacity: opacityText }}
          className={cn(
            "mx-auto max-w-3xl text-center text-white transition-all duration-500",
            backgroundImage &&
              "rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md sm:p-12 md:p-16",
          )}
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 text-lg text-white/95 sm:text-xl">{subtitle}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CtaButton
              href={primaryCta.href}
              label={primaryCta.label}
              size="lg"
              variant="brandSecondary"
            />
            {secondaryCta && (
              <CtaButton
                href={secondaryCta.href}
                label={secondaryCta.label}
                variant="ghost"
                size="lg"
                className="bg-eisblau text-deep-black hover:bg-eisblau/80! hover:text-deep-black! border-white/25"
              />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
