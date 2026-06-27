import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { EventTeaser } from "./event-teaser";
import eventData from "@/lib/latest-event.json";

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

describe("EventTeaser", () => {
  it("renders the event title and description correctly", () => {
    render(<EventTeaser />);
    expect(screen.getByText("Aktuelles Event")).toBeInTheDocument();
    expect(screen.getByText(eventData.title)).toBeInTheDocument();
    expect(screen.getByText(eventData.description)).toBeInTheDocument();
  });

  it("renders the event date badges correctly", () => {
    render(<EventTeaser />);
    const dates = screen.getAllByText(eventData.date);
    expect(dates.length).toBeGreaterThanOrEqual(1);
  });

  it("renders the action inquiry button with correct link", () => {
    render(<EventTeaser />);
    const inquiryLink = screen.getByRole("link", { name: /Jetzt anfragen/i });
    expect(inquiryLink).toBeInTheDocument();
    expect(inquiryLink).toHaveAttribute("href", "/kontakt?subject=Anfrage%20Event");
  });
});
