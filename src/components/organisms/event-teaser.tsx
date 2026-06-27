import Image from "next/image";
import { Calendar } from "lucide-react";
import { SectionHeading } from "@/components/atoms/section-heading";
import eventData from "@/lib/latest-event.json";

export function EventTeaser() {
  if (!eventData || !eventData.title) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading title="Aktuelles Event" centered />

      <div className="border-border bg-background mx-auto max-w-5xl overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="flex flex-col lg:flex-row">
          {/* Image Column */}
          <div className="bg-muted/5 relative flex items-center justify-center lg:max-w-[50%] lg:shrink-0">
            <Image
              src={eventData.imagePath}
              alt={eventData.title}
              width={800}
              height={600}
              priority
              loading="eager"
              className="h-auto w-full object-contain lg:min-h-[900px]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Overlay Date Badge on Mobile/Desktop */}
            <div className="bg-background/90 text-deep-black absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-sm backdrop-blur-sm">
              <Calendar className="text-deep-black h-4 w-4" />
              <span>{eventData.date}</span>
            </div>
          </div>

          {/* Content Column */}
          <div className="flex flex-1 flex-col justify-center p-8 sm:p-10 lg:p-12">
            <span className="text-deep-black/80 text-xs font-semibold tracking-wider uppercase">
              Nächstes Highlight
            </span>
            <h3 className="text-foreground mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              {eventData.title}
            </h3>

            <p className="text-foreground/70 mt-4 text-base leading-relaxed">
              {eventData.description}
            </p>

            <div className="border-border mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
              <div className="text-foreground/60 flex items-center gap-2 text-sm">
                <Calendar className="text-deep-black h-4 w-4" />
                <span>Termin: {eventData.date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
