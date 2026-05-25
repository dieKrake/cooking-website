import type { Metadata } from "next";
import { COURSES, AKTUELLE_KURSE_PAGE } from "@/lib/data";
import { CoursesGrid } from "@/components/organisms/courses-grid";

export const metadata: Metadata = {
  title: AKTUELLE_KURSE_PAGE.title,
  description: AKTUELLE_KURSE_PAGE.description,
};

export default function AktuelleKursePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">
          {AKTUELLE_KURSE_PAGE.title}
        </h1>
        <p className="text-foreground/60 mt-3 text-lg">
          {AKTUELLE_KURSE_PAGE.intro}
        </p>
      </div>
      <CoursesGrid courses={COURSES} />
    </main>
  );
}
