import type { Metadata } from "next";
import { PLACEHOLDER_COURSES } from "@/lib/placeholder-data";

export const metadata: Metadata = {
  title: "Aktuelle Kurse",
  description: "Alle aktuellen Kochkurse und Events im Kochatelier.",
};

export default function AktuelleKursePage() {
  const fixedCourses = PLACEHOLDER_COURSES.filter((c) => c.hasFixedDate);
  const waitlistCourses = PLACEHOLDER_COURSES.filter((c) => !c.hasFixedDate);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Kurse &amp; Events</h1>
      <p className="mt-2 text-gray-600">
        Placeholder – Kurs-Listing. Hier entsteht die CourseList mit
        CourseCard-Komponenten.
      </p>

      <h2 className="mt-8 text-xl font-semibold">Feste Termine</h2>
      <ul className="mt-4 space-y-2">
        {fixedCourses.map((course) => (
          <li key={course.slug} className="border p-4 rounded">
            <strong>{course.title}</strong> – {course.date}, {course.time}
          </li>
        ))}
      </ul>

      <h2 className="mt-8 text-xl font-semibold">Warteliste</h2>
      <ul className="mt-4 space-y-2">
        {waitlistCourses.map((course) => (
          <li key={course.slug} className="border p-4 rounded">
            <strong>{course.title}</strong> – Datum wird noch bekanntgegeben
          </li>
        ))}
      </ul>
    </div>
  );
}
