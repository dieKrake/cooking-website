import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { EventTeaser } from "./event-teaser";

vi.mock("@/lib/latest-event.json", () => ({
  default: {
    title: "Test Event",
    description: "Test Description",
    date: "18. Juni 2026",
    imagePath: "/images/latest-event.webp",
    visible: true,
  },
}));

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

describe("EventTeaser", () => {
  it("renders the event title and description correctly", () => {
    render(<EventTeaser />);
    expect(screen.getByText("Aktuelles Event")).toBeInTheDocument();
    expect(screen.getByText("Test Event")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders the event date badges correctly", () => {
    render(<EventTeaser />);
    const dates = screen.getAllByText("18. Juni 2026");
    expect(dates.length).toBeGreaterThanOrEqual(1);
  });
});
