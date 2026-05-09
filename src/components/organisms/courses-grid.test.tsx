import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { CoursesGrid } from "./courses-grid";
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
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

const mockCourses: Course[] = [
  {
    slug: "pizza",
    title: "Pizza & Pasta",
    description: "Lecker.",
    date: "2026-05-10",
    time: "18:00",
    location: "Kochatelier",
    price: 89,
    image: "https://placehold.co/600x400",
    instructor: "Luca M.",
    hasFixedDate: true,
    category: "Italienisch",
  },
  {
    slug: "sushi",
    title: "Sushi-Kurs",
    description: "Japanisch.",
    date: "2026-05-17",
    time: "17:00",
    location: "Kochatelier",
    price: 95,
    image: "https://placehold.co/600x400",
    instructor: "Vivian K.",
    hasFixedDate: true,
    category: "Japanisch",
  },
];

describe("CoursesGrid", () => {
  it("renders all courses by default", () => {
    render(<CoursesGrid courses={mockCourses} />);
    expect(screen.getByText("Pizza & Pasta")).toBeInTheDocument();
    expect(screen.getByText("Sushi-Kurs")).toBeInTheDocument();
  });

  it("filters courses by category", async () => {
    render(<CoursesGrid courses={mockCourses} />);
    await userEvent.click(screen.getByRole("button", { name: "Japanisch" }));
    expect(screen.queryByText("Pizza & Pasta")).not.toBeInTheDocument();
    expect(screen.getByText("Sushi-Kurs")).toBeInTheDocument();
  });

  it("shows all courses again after clicking Alle", async () => {
    render(<CoursesGrid courses={mockCourses} />);
    await userEvent.click(screen.getByRole("button", { name: "Japanisch" }));
    await userEvent.click(screen.getByRole("button", { name: "Alle" }));
    expect(screen.getByText("Pizza & Pasta")).toBeInTheDocument();
    expect(screen.getByText("Sushi-Kurs")).toBeInTheDocument();
  });

  it("shows empty state when no courses match the filter", async () => {
    render(<CoursesGrid courses={mockCourses} />);
    await userEvent.click(screen.getByRole("button", { name: "Italienisch" }));
    await userEvent.click(screen.getByRole("button", { name: "Japanisch" }));
    expect(screen.queryByText("Pizza & Pasta")).not.toBeInTheDocument();
  });
});
