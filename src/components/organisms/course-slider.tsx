"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/atoms/section-heading";
import { CourseCard } from "@/components/molecules/course-card";
import { COURSES } from "@/lib/data";

export function CourseSlider() {
  const upcomingCourses = COURSES.filter((course) => course.hasFixedDate);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 50);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 50);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  return (
    <section className="px-4 py-16 sm:py-20 lg:px-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <SectionHeading
            title="Kurse"
            subtitle="Unsere Kurse im Überblick"
            centered
            className="mb-4"
          />
          <Link
            href="/aktuelle-kurse"
            className="mb-10 shrink-0 text-sm font-medium underline-offset-4 hover:underline"
          >
            Alle Kurse →
          </Link>
        </div>
        <div className="relative -mx-4 overflow-hidden sm:-mx-6 lg:-mx-8">
          <div
            ref={scrollRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:px-6 lg:gap-8 lg:px-8"
          >
            {upcomingCourses.map((course) => (
              <div
                key={course.slug}
                className="aspect-4/5 w-72 shrink-0 snap-start sm:w-80 lg:w-88"
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
          {/* Rand-Fades: ein-/ausblenden je nach Scroll-Position */}
          <div
            aria-hidden
            className="from-butterweiss to-butterweiss/0 pointer-events-none absolute inset-y-0 left-0 w-6 bg-linear-to-r transition-opacity duration-700 ease-in-out sm:w-12 lg:w-16"
            style={{ opacity: canScrollLeft ? 1 : 0 }}
          />
          <div
            aria-hidden
            className="from-butterweiss to-butterweiss/0 pointer-events-none absolute inset-y-0 right-0 w-6 bg-linear-to-l transition-opacity duration-700 ease-in-out sm:w-12 lg:w-16"
            style={{ opacity: canScrollRight ? 1 : 0 }}
          />
        </div>
      </div>
    </section>
  );
}
