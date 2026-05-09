import type { Metadata } from "next";
import { PLACEHOLDER_COURSES } from "@/lib/placeholder-data";
import { CoursesGrid } from "@/components/organisms/courses-grid";

export const metadata: Metadata = {
  title: "Aktuelle Kurse",
  description: "Alle aktuellen Kochkurse und Events im Kochatelier Wiesbaden.",
};

export default function AktuelleKursePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Aktuelle Kurse</h1>
        <p className="text-foreground/60 mt-3 text-lg">
          Entdecke unsere Kochkurse – von internationaler Küche bis hin zu
          besonderen Themenabenden.
        </p>
      </div>
      <CoursesGrid courses={PLACEHOLDER_COURSES} />
    </main>
  );
}
