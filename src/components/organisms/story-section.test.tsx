import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { StorySection } from "./story-section";

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

describe("StorySection", () => {
  it("renders the first section heading", () => {
    render(<StorySection />);
    expect(screen.getByText("Von Rumänien nach Aalen")).toBeInTheDocument();
  });

  it("renders the second section heading", () => {
    render(<StorySection />);
    expect(
      screen.getByText("Erfahrung trifft Leidenschaft"),
    ).toBeInTheDocument();
  });

  it("renders the founder image", () => {
    render(<StorySection />);
    expect(
      screen.getByRole("img", { name: /Gründer von Culina/i }),
    ).toBeInTheDocument();
  });

  it("renders the closing quote", () => {
    render(<StorySection />);
    expect(screen.getByText(/Culina soll ein Ort sein/i)).toBeInTheDocument();
  });
});
