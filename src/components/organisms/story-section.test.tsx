import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { StorySection } from "./story-section";

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

describe("StorySection", () => {
  it("renders the founder name", () => {
    render(<StorySection />);
    expect(screen.getByText(/Hallo, ich bin Sandra/i)).toBeInTheDocument();
  });

  it("renders the founder image", () => {
    render(<StorySection />);
    expect(
      screen.getByRole("img", { name: /Gründerin/i }),
    ).toBeInTheDocument();
  });

  it("renders the values section heading", () => {
    render(<StorySection />);
    expect(screen.getByText("Meine Werte")).toBeInTheDocument();
  });

  it("renders all three values", () => {
    render(<StorySection />);
    expect(screen.getByText("Leidenschaft")).toBeInTheDocument();
    expect(screen.getByText("Nachhaltigkeit")).toBeInTheDocument();
    expect(screen.getByText("Gemeinschaft")).toBeInTheDocument();
  });
});
