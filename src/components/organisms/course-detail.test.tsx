import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CourseDetail } from "./course-detail";
import type { Course } from "@/types";

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

const mockCourse: Course = {
  slug: "pizza-und-pasta",
  title: "Pizza & Pasta – Italiens Klassiker",
  description:
    "Lerne, wie echter Pizzateig und frische Pasta zubereitet werden.",
  date: "2026-05-10",
  time: "18:00 – 21:00",
  price: 89,
  image: "https://placehold.co/600x400",
  instructor: "Luca M.",
  hasFixedDate: true,
  category: "Italienisch",
};

const mockCourseNoDate: Course = {
  ...mockCourse,
  slug: "sauerteig-brot",
  title: "Sauerteig & Sonntagsbrunch",
  date: null,
  time: null,
  hasFixedDate: false,
};

describe("CourseDetail", () => {
  it("renders the course title", () => {
    render(<CourseDetail course={mockCourse} />);
    expect(
      screen.getByRole("heading", { name: /Pizza & Pasta/i }),
    ).toBeInTheDocument();
  });

  it("renders the course description", () => {
    render(<CourseDetail course={mockCourse} />);
    expect(screen.getByText(/echter Pizzateig/)).toBeInTheDocument();
  });

  it("renders the course image with correct alt text", () => {
    render(<CourseDetail course={mockCourse} />);
    expect(
      screen.getByRole("img", { name: /Pizza & Pasta/i }),
    ).toBeInTheDocument();
  });

  it("renders the instructor name", () => {
    render(<CourseDetail course={mockCourse} />);
    expect(screen.getByText("Luca M.")).toBeInTheDocument();
  });

  it("renders the price", () => {
    render(<CourseDetail course={mockCourse} />);
    expect(screen.getByText(/89 € pro Person/)).toBeInTheDocument();
  });

  it("renders the category badge", () => {
    render(<CourseDetail course={mockCourse} />);
    expect(screen.getAllByText("Italienisch").length).toBeGreaterThan(0);
  });

  it("renders the date for courses with fixed date", () => {
    render(<CourseDetail course={mockCourse} />);
    expect(screen.getByText(/Mai 2026/)).toBeInTheDocument();
  });

  it("renders 'Datum wird noch bekannt gegeben' for courses without date", () => {
    render(<CourseDetail course={mockCourseNoDate} />);
    expect(
      screen.getByText(/Datum wird noch bekannt gegeben/i),
    ).toBeInTheDocument();
  });

  it("does not render time row for courses without date", () => {
    render(<CourseDetail course={mockCourseNoDate} />);
    expect(screen.queryByText("Uhrzeit")).not.toBeInTheDocument();
  });

  it("renders the inquiry link pointing to /#kontakt", () => {
    render(<CourseDetail course={mockCourse} />);
    expect(
      screen.getByRole("link", { name: /Jetzt anfragen/i }),
    ).toHaveAttribute("href", "/#kontakt");
  });

  it("renders a back link to /aktuelle-kurse", () => {
    render(<CourseDetail course={mockCourse} />);
    expect(screen.getByRole("link", { name: /Alle Kurse/i })).toHaveAttribute(
      "href",
      "/aktuelle-kurse",
    );
  });
});
