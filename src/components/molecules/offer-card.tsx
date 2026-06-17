import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OfferCard as OfferCardType } from "@/types";

interface OfferCardProps {
  offer: OfferCardType;
  index?: number;
}

export function OfferCard({ offer, index = 0 }: OfferCardProps) {
  const number = (index + 1).toString().padStart(2, "0");

  return (
    <article
      className={cn(
        "group text-pure-white relative flex aspect-4/5 flex-col justify-end overflow-hidden rounded-2xl",
        "shadow-[0_10px_40px_-12px_rgba(29,29,27,0.45)] ring-1 ring-white/10",
        "transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_28px_60px_-18px_rgba(29,29,27,0.6)]",
      )}
    >
      {/* Bild als kulinarische Bühne */}
      <Image
        src={offer.image}
        alt={offer.imageAlt || offer.title}
        fill
        className="object-cover transition-transform duration-1200 ease-out group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* Verlauf für Lesbarkeit & Stimmung */}
      <div
        aria-hidden
        className="from-deep-black/95 via-deep-black/55 absolute inset-0 bg-linear-to-t to-transparent transition-opacity duration-500 group-hover:from-black"
      />

      {/* Editorial-Index */}
      <span className="text-pasta-gelb/90 font-heading absolute top-5 left-6 z-10 text-sm tracking-[0.35em] tabular-nums">
        {number}
      </span>

      {/* Inhalt */}
      <div className="relative z-10 flex flex-col gap-3 p-6 sm:p-7">
        <span
          aria-hidden
          className="bg-pasta-gelb h-px w-10 origin-left transition-all duration-500 group-hover:w-16"
        />

        <h3 className="font-heading text-2xl leading-tight tracking-tight sm:text-[1.75rem]">
          {offer.title}
        </h3>

        <p className="text-pure-white/75 max-w-prose text-sm leading-relaxed">
          {offer.description}
        </p>

        <Link
          href={offer.ctaHref}
          className="text-pasta-gelb mt-2 inline-flex w-fit items-center gap-1.5 text-sm font-medium tracking-wide transition-colors hover:text-white"
        >
          {offer.ctaLabel}
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}
