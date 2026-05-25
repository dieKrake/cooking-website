import Image from "next/image";
import { UEBER_MICH_PAGE } from "@/lib/placeholder-data";

export function StorySection() {
  return (
    <div className="space-y-20">
      <section className="grid items-center gap-12 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl">
          <Image
            src={UEBER_MICH_PAGE.section1Image}
            alt={UEBER_MICH_PAGE.section1ImageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="space-y-5">
          <div>
            <p className="text-primary text-sm font-medium tracking-widest uppercase">
              {UEBER_MICH_PAGE.section1Label}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              {UEBER_MICH_PAGE.section1Title}
            </h2>
          </div>
          <p className="text-foreground/70">{UEBER_MICH_PAGE.section1Text1}</p>
          <p className="text-foreground/70">{UEBER_MICH_PAGE.section1Text2}</p>
        </div>
      </section>

      <section className="grid items-center gap-12 lg:grid-cols-2">
        <div className="order-2 space-y-5 lg:order-1">
          <div>
            <p className="text-primary text-sm font-medium tracking-widest uppercase">
              {UEBER_MICH_PAGE.section2Label}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              {UEBER_MICH_PAGE.section2Title}
            </h2>
          </div>
          <p className="text-foreground/70">{UEBER_MICH_PAGE.section2Text1}</p>
          <p className="text-foreground/70">{UEBER_MICH_PAGE.section2Text2}</p>
          <p className="text-foreground/70">{UEBER_MICH_PAGE.section2Text3}</p>
        </div>
        <div className="relative order-1 aspect-square overflow-hidden rounded-2xl lg:order-2">
          <Image
            src={UEBER_MICH_PAGE.section2Image}
            alt={UEBER_MICH_PAGE.section2ImageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="text-center">
        <p className="text-foreground/70 mx-auto max-w-3xl text-lg italic">
          {UEBER_MICH_PAGE.quote}
        </p>
      </section>
    </div>
  );
}
