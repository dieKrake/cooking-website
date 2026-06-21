import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, User, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Course } from "@/types";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <article
      className={cn(
        "group text-pure-white relative flex h-full flex-col justify-end overflow-hidden rounded-2xl",
        "shadow-[0_10px_40px_-12px_rgba(29,29,27,0.45)] ring-1 ring-white/10",
        "transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_28px_60px_-18px_rgba(29,29,27,0.6)]",
      )}
    >
      {/* Bild als kulinarische Bühne */}
      <Image
        src={course.image}
        alt={course.title}
        fill
        className="object-cover transition-transform duration-1200 ease-out group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* Verlauf für Lesbarkeit & Stimmung */}
      <div
        aria-hidden
        className="from-deep-black/95 via-deep-black/55 absolute inset-0 bg-linear-to-t to-transparent transition-opacity duration-500 group-hover:from-black"
      />

      {/* Kategorie */}
      <Badge variant="brand" className="absolute top-5 left-6 z-10">
        {course.category}
      </Badge>

      {/* Inhalt */}
      <div className="relative z-10 flex flex-col gap-3 p-6 sm:p-7">
        <span
          aria-hidden
          className="bg-pasta-gelb h-px w-10 origin-left transition-all duration-500 group-hover:w-16"
        />

        <h3 className="font-heading text-xl leading-tight tracking-tight sm:text-2xl">
          {course.title}
        </h3>

        <div className="text-pure-white/75 flex flex-col gap-1.5 text-sm">
          {course.date ? (
            <div className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 shrink-0" />
              <span>{formatDate(course.date)}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 shrink-0" />
              <span>Auf Anfrage</span>
            </div>
          )}
          {course.time && (
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 shrink-0" />
              <span>{course.time}</span>
            </div>
          )}
          {course.instructor && (
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4 shrink-0" />
              <span>{course.instructor}</span>
            </div>
          )}
        </div>

        <div className="mt-2 flex items-center justify-between gap-3 border-t border-white/15 pt-4">
          {course.price !== null && (
            <span className="font-heading text-lg">{course.price} €</span>
          )}
          <Link
            href={`/kurse/${course.slug}`}
            className="text-pasta-gelb ml-auto inline-flex w-fit items-center gap-1.5 text-sm font-medium tracking-wide transition-colors hover:text-white"
          >
            Details
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
