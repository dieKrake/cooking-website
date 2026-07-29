import type { Metadata } from "next";
import Image from "next/image";
import { COURSES, AKTUELLE_KURSE_PAGE } from "@/lib/data";
import { CoursesGrid } from "@/components/organisms/courses-grid";

export const metadata: Metadata = {
  title: AKTUELLE_KURSE_PAGE.title,
  description: AKTUELLE_KURSE_PAGE.description,
};

export default function AktuelleKursePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 shadow-2xl sm:py-28">
        <div className="absolute inset-0 z-0">
          <Image
            src={AKTUELLE_KURSE_PAGE.heroImage}
            alt={AKTUELLE_KURSE_PAGE.heroImageAlt}
            fill
            className="object-cover"
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={70}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {AKTUELLE_KURSE_PAGE.title}
            </h1>
            <h2 className="mt-4 text-xl font-medium text-white/90 sm:text-2xl">
              {AKTUELLE_KURSE_PAGE.subtitle}
            </h2>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-foreground/60 mb-10 max-w-2xl text-lg">
          {AKTUELLE_KURSE_PAGE.intro}
        </p>
        <CoursesGrid courses={COURSES} layout="wide" />
      </div>
    </main>
  );
}
