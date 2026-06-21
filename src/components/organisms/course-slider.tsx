import Link from "next/link";
import { SectionHeading } from "@/components/atoms/section-heading";
import { CourseCard } from "@/components/molecules/course-card";
import { COURSES } from "@/lib/data";

export function CourseSlider() {
  const upcomingCourses = COURSES.filter((course) => course.hasFixedDate);

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <SectionHeading
            title="Kurse"
            subtitle="Unsere Kurse im Überblick"
            className="mb-0"
          />
          <Link
            href="/aktuelle-kurse"
            className="mb-10 shrink-0 text-sm font-medium underline-offset-4 hover:underline"
          >
            Alle Kurse →
          </Link>
        </div>
        <div className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0 lg:gap-8">
          {upcomingCourses.map((course) => (
            <div
              key={course.slug}
              className="aspect-4/5 w-72 shrink-0 snap-start sm:w-80 lg:w-88"
            >
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
