import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TeamCard } from "./team-card";
import type { TeamMember } from "@/types";

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

const mockMember: TeamMember = {
  id: "luca",
  name: "Luca M.",
  role: "Italienische Küche – Kursleitung",
  bio: "Im Restaurant seiner Eltern aufgewachsen.",
  image: "https://placehold.co/400x400?text=Luca",
};

describe("TeamCard", () => {
  it("renders the member name", () => {
    render(<TeamCard member={mockMember} />);
    expect(screen.getByText("Luca M.")).toBeInTheDocument();
  });

  it("renders the role", () => {
    render(<TeamCard member={mockMember} />);
    expect(
      screen.getByText("Italienische Küche – Kursleitung"),
    ).toBeInTheDocument();
  });

  it("renders the bio", () => {
    render(<TeamCard member={mockMember} />);
    expect(screen.getByText(/Im Restaurant seiner Eltern/)).toBeInTheDocument();
  });

  it("renders the profile image with correct alt text", () => {
    render(<TeamCard member={mockMember} />);
    expect(screen.getByRole("img", { name: "Luca M." })).toBeInTheDocument();
  });

  it("does not render external link when externalUrl is absent", () => {
    render(<TeamCard member={mockMember} />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders external link when externalUrl is provided", () => {
    render(
      <TeamCard
        member={{ ...mockMember, externalUrl: "https://example.com" }}
      />,
    );
    const link = screen.getByRole("link", { name: /Website besuchen/i });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
