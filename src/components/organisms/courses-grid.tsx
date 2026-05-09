"use client";

import { useState, useMemo } from "react";
import { CategoryFilter } from "@/components/molecules/category-filter";
import { CourseCard } from "@/components/molecules/course-card";
import type { Course } from "@/types";

interface CoursesGridProps {
  courses: Course[];
}

export function CoursesGrid({ courses }: CoursesGridProps) {
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
        <p className="mt-12 text-center text-foreground/50">
          Keine Kurse in dieser Kategorie gefunden.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
