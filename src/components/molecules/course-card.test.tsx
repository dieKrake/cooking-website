import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CourseCard } from "./course-card";
import type { Course } from "@/types";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => <a href={href} className={className}>{children}</a>,
}));

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => <img src={src} alt={alt} className={className} />,
}));

const mockCourse: Course = {
  slug: "pizza-und-pasta",
  title: "Pizza & Pasta – Italiens Klassiker",
  description: "Lerne, wie echter Pizzateig und frische Pasta zubereitet werden.",
  date: "2026-05-10",
  time: "18:00 – 21:00",
  location: "Kochatelier, Musterstraße 1",
  price: 89,
  image: "https://placehold.co/600x400?text=Pizza",
  instructor: "Luca M.",
  hasFixedDate: true,
  category: "Italienisch",
};

describe("CourseCard", () => {
  it("renders the course title", () => {
    render(<CourseCard course={mockCourse} />);
    expect(screen.getByText("Pizza & Pasta – Italiens Klassiker")).toBeInTheDocument();
  });

  it("renders the category badge", () => {
    render(<CourseCard course={mockCourse} />);
    expect(screen.getByText("Italienisch")).toBeInTheDocument();
  });

  it("renders the formatted date", () => {
    render(<CourseCard course={mockCourse} />);
    expect(screen.getByText("10. Mai 2026")).toBeInTheDocument();
  });

  it("renders time and instructor", () => {
    render(<CourseCard course={mockCourse} />);
    expect(screen.getByText("18:00 – 21:00")).toBeInTheDocument();
    expect(screen.getByText("Luca M.")).toBeInTheDocument();
  });

  it("renders the price", () => {
    render(<CourseCard course={mockCourse} />);
    expect(screen.getByText("89 €")).toBeInTheDocument();
  });

  it("renders a details link to the correct slug", () => {
    render(<CourseCard course={mockCourse} />);
    expect(screen.getByRole("link", { name: /Details/i })).toHaveAttribute(
      "href",
      "/kurse/pizza-und-pasta",
    );
  });

  it("does not render date/time if hasFixedDate is false", () => {
    render(<CourseCard course={{ ...mockCourse, date: null, time: null }} />);
    expect(screen.queryByText("10. Mai 2026")).not.toBeInTheDocument();
    expect(screen.queryByText("18:00 – 21:00")).not.toBeInTheDocument();
  });
});
