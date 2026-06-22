import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TeamGrid } from "./team-grid";
import type { TeamMember } from "@/types";

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

const mockMembers: TeamMember[] = [
  {
    id: "luca",
    name: "Luca M.",
    role: "Italienische Küche",
    bio: "Bio Luca.",
    image: "https://placehold.co/400x400",
  },
  {
    id: "vivian",
    name: "Vivian K.",
    role: "Asiatische Küche",
    bio: "Bio Vivian.",
    image: "https://placehold.co/400x400",
    externalUrl: "https://example.com",
  },
];

describe("TeamGrid", () => {
  it("renders a card for each team member", () => {
    render(<TeamGrid members={mockMembers} />);
    expect(screen.getByText("Luca M.")).toBeInTheDocument();
    expect(screen.getByText("Vivian K.")).toBeInTheDocument();
  });

  it("renders the external link for members with externalUrl", () => {
    render(<TeamGrid members={mockMembers} />);
    expect(
      screen.getByRole("link", { name: /Profil ansehen/i }),
    ).toHaveAttribute("href", "https://example.com");
  });
});
