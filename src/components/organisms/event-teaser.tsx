import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/atoms/section-heading";
import eventData from "@/lib/latest-event.json";

export function EventTeaser() {
  if (!eventData || !eventData.title) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        title="Aktuelles Event"
        subtitle="Verpasse kein Highlight in unserem Kochatelier – unser aktuellstes Event im Überblick"
        centered
      />

      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="grid gap-0 md:grid-cols-2">
          {/* Image Column */}
          <div className="relative min-h-[300px] sm:min-h-[400px] md:min-h-full">
            <Image
              src={eventData.imagePath}
              alt={eventData.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Overlay Date Badge on Mobile/Desktop */}
            <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-background/90 px-4 py-2 text-sm font-semibold text-foreground backdrop-blur-sm shadow-sm">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{eventData.date}</span>
            </div>
          </div>

          {/* Content Column */}
          <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Nächstes Highlight
            </span>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {eventData.title}
            </h3>
            
            <p className="mt-4 text-base leading-relaxed text-foreground/70">
              {eventData.description}
            </p>

            <div className="mt-8 pt-6 border-t border-border flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-foreground/60">
                <Calendar className="h-4 w-4 text-primary" />
                <span>Termin: {eventData.date}</span>
              </div>
              
              <Link
                href="/kontakt?subject=Anfrage%20Event"
                className="group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
              >
                Jetzt anfragen
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
