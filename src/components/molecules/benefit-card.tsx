import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Benefit } from "@/types";

interface BenefitCardProps {
  benefit: Benefit;
  tone?: "dark" | "light";
  className?: string;
}

export function BenefitCard({
  benefit,
  tone = "dark",
  className,
}: BenefitCardProps) {
  const Icon = benefit.icon ?? CheckCircle2;
  const isLight = tone === "light";

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 ease-out hover:-translate-y-1 sm:p-7",
        isLight
          ? "bg-pure-white text-foreground border-border/60 border shadow-sm hover:shadow-[0_24px_45px_-28px_rgba(29,29,27,0.35)]"
          : "text-pure-white bg-deep-black shadow-md ring-1 ring-white/5 hover:shadow-[0_24px_45px_-24px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 opacity-80 transition-opacity group-hover:opacity-100",
          isLight
            ? "bg-[radial-gradient(circle_at_top,rgba(242,232,164,0.35),transparent_55%)]"
            : "bg-[radial-gradient(circle_at_top,rgba(255,224,170,0.08),transparent_55%)]",
        )}
      />
      <div className="relative z-10 flex items-center gap-3">
        <span
          className={cn(
            "flex size-11 items-center justify-center rounded-full border",
            isLight
              ? "bg-pasta-gelb/50 text-deep-black border-pasta-gelb"
              : "bg-pasta-gelb/15 text-pasta-gelb border-pasta-gelb/30",
          )}
        >
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <h3 className="font-heading text-xl leading-tight tracking-tight">
          {benefit.title}
        </h3>
      </div>
      <p
        className={cn(
          "relative z-10 mt-4 text-sm leading-relaxed",
          isLight ? "text-foreground/70" : "text-pure-white/75",
        )}
      >
        {benefit.description}
      </p>
      <span
        aria-hidden
        className={cn(
          "relative z-10 mt-6 block h-px w-12 origin-left transition-all duration-500 group-hover:w-20",
          isLight ? "bg-deep-black/40" : "bg-pasta-gelb/70",
        )}
      />
    </article>
  );
}
