import Link from "next/link";
import { SectionHeading } from "@/components/atoms/section-heading";
import { CourseCard } from "@/components/molecules/course-card";
import { COURSES } from "@/lib/placeholder-data";

export function CourseSlider() {
  const upcomingCourses = COURSES.filter((course) => course.hasFixedDate);

  return (
    <section className="bg-muted/30 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <SectionHeading
            title="Aktuelle Kurse"
            subtitle="Nächste Termine auf einen Blick."
            className="mb-0"
          />
          <Link
            href="/aktuelle-kurse"
            className="mb-10 shrink-0 text-sm font-medium underline-offset-4 hover:underline"
          >
            Alle Kurse →
          </Link>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3">
          {upcomingCourses.map((course) => (
            <div
              key={course.slug}
              className="w-72 shrink-0 sm:h-full sm:w-auto"
            >
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
