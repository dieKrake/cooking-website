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

      <div className="border-border bg-background mx-auto max-w-5xl overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="grid gap-0 md:grid-cols-2">
          {/* Image Column */}
          <div className="relative min-h-[300px] sm:min-h-[400px] md:min-h-full">
            <Image
              src={eventData.imagePath}
              alt={eventData.title}
              fill
              priority
              loading="eager"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Overlay Date Badge on Mobile/Desktop */}
            <div className="bg-background/90 text-foreground absolute top-4 left-4 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-sm backdrop-blur-sm">
              <Calendar className="text-primary h-4 w-4" />
              <span>{eventData.date}</span>
            </div>
          </div>

          {/* Content Column */}
          <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
            <span className="text-primary text-xs font-semibold tracking-wider uppercase">
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
                <Calendar className="text-primary h-4 w-4" />
                <span>Termin: {eventData.date}</span>
              </div>

              <Link
                href="/kontakt?subject=Anfrage%20Event"
                className="group bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold shadow-sm transition-colors"
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
