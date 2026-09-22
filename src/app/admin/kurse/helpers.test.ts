import { describe, it, expect } from "vitest";
import { slugify, uniqueSlug, upsertCourse, removeCourse } from "./helpers";
import type { Course } from "@/types";

const baseCourse: Course = {
  slug: "pasta",
  title: "Pasta Kurs",
  shortDescription: "Kurz",
  longDescription: "Lang",
  date: "2026-09-05",
  time: "18:00 Uhr",
  price: 65,
  image: "/images/courses/pasta.webp",
  instructor: "Fabry",
  hasFixedDate: true,
  category: "Italienisch",
};

describe("slugify", () => {
  it("converts titles to kebab-case", () => {
    expect(slugify("Pasta Kurs + Aperol")).toBe("pasta-kurs-aperol");
  });

  it("transliterates German umlauts", () => {
    expect(slugify("Süße Köstlichkeiten für Genießer")).toBe(
      "suesse-koestlichkeiten-fuer-geniesser",
    );
  });

  it("strips leading and trailing separators", () => {
    expect(slugify("  Sushi!  ")).toBe("sushi");
  });

  it("returns an empty string for titles without valid characters", () => {
    expect(slugify("+++")).toBe("");
  });
});

describe("uniqueSlug", () => {
  it("returns the base slug when unused", () => {
    expect(uniqueSlug("pasta", ["sushi"])).toBe("pasta");
  });

  it("appends a numeric suffix on collision", () => {
    expect(uniqueSlug("pasta", ["pasta"])).toBe("pasta-2");
    expect(uniqueSlug("pasta", ["pasta", "pasta-2"])).toBe("pasta-3");
  });
});

describe("upsertCourse", () => {
  it("appends a new course", () => {
    const newCourse = { ...baseCourse, slug: "sushi", title: "Sushi" };
    const result = upsertCourse([baseCourse], newCourse);
    expect(result).toHaveLength(2);
    expect(result[1].slug).toBe("sushi");
  });

  it("replaces an existing course by slug", () => {
    const updated = { ...baseCourse, title: "Pasta Deluxe" };
    const result = upsertCourse([baseCourse], updated);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Pasta Deluxe");
  });

  it("does not mutate the original array", () => {
    const courses = [baseCourse];
    upsertCourse(courses, { ...baseCourse, title: "Neu" });
    expect(courses[0].title).toBe("Pasta Kurs");
  });
});

describe("removeCourse", () => {
  it("removes the course with the given slug", () => {
    expect(removeCourse([baseCourse], "pasta")).toHaveLength(0);
  });

  it("keeps other courses", () => {
    const other = { ...baseCourse, slug: "sushi" };
    const result = removeCourse([baseCourse, other], "pasta");
    expect(result).toEqual([other]);
  });
});
