import { SectionHeading } from "@/components/atoms/section-heading";
import { BenefitCard } from "@/components/molecules/benefit-card";
import type { Benefit } from "@/types";

interface BenefitsGridProps {
  benefits: Benefit[];
}

export function BenefitsGrid({ benefits }: BenefitsGridProps) {
  return (
    <section className="py-12">
      <SectionHeading
        title="Warum du bei uns richtig bist"
        subtitle="Was du bekommst, wenn du mit uns zusammenarbeitest."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit) => (
          <BenefitCard key={benefit.title} benefit={benefit} />
        ))}
      </div>
    </section>
  );
}
