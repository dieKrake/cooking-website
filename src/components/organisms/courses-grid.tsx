"use client";

import { useState, useMemo } from "react";
import { CategoryFilter } from "@/components/molecules/category-filter";
import { CourseCard } from "@/components/molecules/course-card";
import type { Course } from "@/types";

interface CoursesGridProps {
  courses: Course[];
  layout?: "default" | "wide";
}

export function CoursesGrid({ courses, layout = "default" }: CoursesGridProps) {
  const [activeCategory, setActiveCategory] = useState("Alle");

  const categories = useMemo(
    () => Array.from(new Set(courses.map((c) => c.category))),
    [courses],
  );

  const filtered = useMemo(
    () =>
      activeCategory === "Alle"
        ? courses
        : courses.filter((c) => c.category === activeCategory),
    [courses, activeCategory],
  );

  return (
    <div>
      <CategoryFilter
        categories={categories}
        active={activeCategory}
        onChange={setActiveCategory}
      />
      {filtered.length === 0 ? (
        <p className="text-foreground/50 mt-12 text-center">
          Keine Kurse in dieser Kategorie gefunden.
        </p>
      ) : (
        <div
          className={
            layout === "wide"
              ? "mx-auto mt-8 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-2"
              : "mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          }
        >
          {filtered.map((course) => (
            <CourseCard
              key={course.slug}
              course={course}
              variant={layout === "wide" ? "wide" : "default"}
            />
          ))}
        </div>
      )}
    </div>
  );
}
