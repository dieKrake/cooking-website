import { CheckCircle2 } from "lucide-react";
import type { Benefit } from "@/types";

interface BenefitCardProps {
  benefit: Benefit;
}

export function BenefitCard({ benefit }: BenefitCardProps) {
  const Icon = benefit.icon ?? CheckCircle2;

  return (
    <article className="group text-pure-white bg-deep-black relative overflow-hidden rounded-2xl p-6 ring-1 ring-white/5 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_24px_45px_-24px_rgba(0,0,0,0.8)] sm:p-7">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,224,170,0.08),transparent_55%)] opacity-80 transition-opacity group-hover:opacity-100"
      />
      <div className="relative z-10 flex items-center gap-3">
        <span className="bg-pasta-gelb/15 text-pasta-gelb border-pasta-gelb/30 flex size-11 items-center justify-center rounded-full border">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <h3 className="font-heading text-xl leading-tight tracking-tight">
          {benefit.title}
        </h3>
      </div>
      <p className="text-pure-white/75 relative z-10 mt-4 text-sm leading-relaxed">
        {benefit.description}
      </p>
      <span
        aria-hidden
        className="bg-pasta-gelb/70 relative z-10 mt-6 block h-px w-12 origin-left transition-all duration-500 group-hover:w-20"
      />
    </article>
  );
}
