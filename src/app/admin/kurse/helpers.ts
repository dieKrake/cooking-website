import type { Course } from "@/types";

/**
 * Generates a URL-safe slug from a course title
 * (transliterates German umlauts, kebab-case).
 */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Ensures the slug is unique within the existing slugs by
 * appending a numeric suffix if needed.
 */
export function uniqueSlug(base: string, existingSlugs: string[]): string {
  if (!existingSlugs.includes(base)) return base;
  let counter = 2;
  while (existingSlugs.includes(`${base}-${counter}`)) {
    counter++;
  }
  return `${base}-${counter}`;
}

/**
 * Inserts a new course or replaces an existing one (matched by slug).
 */
export function upsertCourse(courses: Course[], course: Course): Course[] {
  const index = courses.findIndex((c) => c.slug === course.slug);
  if (index === -1) return [...courses, course];
  return courses.map((c, i) => (i === index ? course : c));
}

/**
 * Removes a course by slug.
 */
export function removeCourse(courses: Course[], slug: string): Course[] {
  return courses.filter((c) => c.slug !== slug);
}
