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
        className="text-primary mt-0.5 h-5 w-5 shrink-0"
        aria-hidden="true"
      />
      <div>
        <p className="text-foreground/50 text-xs font-medium tracking-wider uppercase">
          {label}
        </p>
        <p className="mt-0.5 text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

export function CourseDetail({ course }: CourseDetailProps) {
  const dateLabel =
    course.hasFixedDate && course.date
      ? new Date(course.date).toLocaleDateString("de-DE", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
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
            {course.description}
          </p>
        </div>

        <aside className="flex flex-col gap-5 rounded-2xl border p-6">
          <MetaItem icon={Calendar} label="Datum" value={dateLabel} />
          {course.hasFixedDate && (
            <MetaItem icon={Clock} label="Uhrzeit" value={timeLabel} />
          )}
          <MetaItem icon={MapPin} label="Ort" value={course.location} />
          <MetaItem icon={User} label="Kursleiter" value={course.instructor} />
          <MetaItem icon={Euro} label="Preis" value={priceLabel} />
          <MetaItem icon={Tag} label="Kategorie" value={course.category} />

          <hr className="border-border" />

          <div className="space-y-3">
            <Link
              href="/#kontakt"
              className={buttonVariants({ size: "lg", className: "w-full" })}
            >
              Jetzt anfragen
            </Link>
            <p className="text-foreground/50 text-center text-xs">
              Verbindliche Anmeldung per E-Mail oder Kontaktformular
            </p>
          </div>
        </aside>
      </div>
    </article>
  );
}
