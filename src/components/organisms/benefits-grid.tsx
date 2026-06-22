import { SectionHeading } from "@/components/atoms/section-heading";
import { BenefitCard } from "@/components/molecules/benefit-card";
import type { Benefit } from "@/types";

interface BenefitsGridProps {
  benefits: Benefit[];
}

export function BenefitsGrid({ benefits }: BenefitsGridProps) {
  return (
    <section className="bg-deep-black relative mt-20 overflow-hidden rounded-[36px] px-6 py-16 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.85)] sm:px-10 lg:px-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(45%_60%_at_50%_0%,rgba(255,255,255,0.08),transparent)]"
      />
      <div className="relative z-10">
        <span className="text-pasta-gelb/80 font-heading text-xs tracking-[0.4em] uppercase">
          Benefits
        </span>
        <SectionHeading
          title="Warum du bei uns richtig bist"
          subtitle="Mehr als nur eine Küche: Wir begleiten dich von der Idee bis zum Kursabend."
          className="text-pure-white"
        />
      </div>
      <div className="relative z-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit) => (
          <BenefitCard key={benefit.title} benefit={benefit} />
        ))}
      </div>
    </section>
  );
}
