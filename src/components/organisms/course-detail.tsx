import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Euro,
  ArrowLeft,
  Tag,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import type { Course } from "@/types";
import { CONTACT_INFO } from "@/lib/constants";

interface CourseDetailProps {
  course: Course;
}

interface MetaItemProps {
  icon: React.ComponentType<{
    className?: string;
    "aria-hidden"?: boolean | "true" | "false";
  }>;
  label: string;
  value: string;
}

function MetaItem({ icon: Icon, label, value }: MetaItemProps) {
  return (
    <div className="flex items-start gap-3">
      <Icon
        className="text-pasta-gelb mt-0.5 h-5 w-5 shrink-0"
        aria-hidden="true"
      />
      <div>
        <p className="text-pure-white/60 text-[0.7rem] font-semibold tracking-[0.35em] uppercase">
          {label}
        </p>
        <p className="text-pure-white mt-1 text-sm leading-tight">{value}</p>
      </div>
    </div>
  );
}

export function CourseDetail({ course }: CourseDetailProps) {
  const dateLabel =
    course.hasFixedDate && course.date
      ? new Intl.DateTimeFormat("de-DE", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          timeZone: "UTC",
        }).format(new Date(course.date))
      : "Datum wird noch bekannt gegeben";

  const timeLabel = course.time ?? "–";
  const priceLabel = course.price
    ? `${course.price} € pro Person`
    : "Auf Anfrage";

  return (
    <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/aktuelle-kurse"
        className="text-foreground/60 hover:text-foreground mb-8 inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Alle Kurse
      </Link>

      <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl">
        <Image
          src={course.image}
          alt={course.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 900px"
        />
      </div>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <span className="text-foreground/60 inline-block rounded-full border px-3 py-0.5 text-xs font-medium">
            {course.category}
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight lg:text-4xl">
            {course.title}
          </h1>
          <p className="text-foreground/70 mt-4 text-base leading-relaxed">
            {course.longDescription}
          </p>
        </div>

        <aside className="group bg-deep-black text-pure-white relative overflow-hidden rounded-[32px] p-6 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.8)] ring-1 ring-white/10 sm:p-8">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(75%_100%_at_0%_0%,rgba(255,255,255,0.08),transparent)] opacity-80 transition-opacity duration-500 group-hover:opacity-100"
          />
          <div className="relative z-10 flex flex-col gap-5">
            <div>
              <p className="text-pure-white/70 text-xs font-semibold tracking-[0.35em] uppercase">
                Kursinfos
              </p>
              <h2 className="font-heading mt-3 text-2xl leading-tight tracking-tight">
                Dein Abend auf einen Blick
              </h2>
              <span className="bg-pasta-gelb/80 mt-4 block h-px w-12" />
            </div>

            <div className="space-y-4">
              <MetaItem icon={Calendar} label="Datum" value={dateLabel} />
              {course.hasFixedDate && (
                <MetaItem icon={Clock} label="Uhrzeit" value={timeLabel} />
              )}
              <MetaItem
                icon={MapPin}
                label="Ort"
                value={CONTACT_INFO.address.street}
              />
              {course.instructor && (
                <MetaItem
                  icon={User}
                  label="Kursleiter"
                  value={course.instructor}
                />
              )}
              <MetaItem icon={Euro} label="Preis" value={priceLabel} />
              <MetaItem icon={Tag} label="Kategorie" value={course.category} />
            </div>

            <div className="mt-4 border-t border-white/15 pt-5">
              <Link
                href="/#kontakt"
                className={buttonVariants({
                  variant: "brandSecondary",
                  size: "lg",
                  className: "w-full text-base",
                })}
              >
                Jetzt anfragen
              </Link>
              <p className="text-pure-white/65 mt-3 text-center text-xs leading-relaxed">
                Verbindliche Anmeldung per E-Mail oder Kontaktformular
              </p>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
