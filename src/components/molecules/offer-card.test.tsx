import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { OfferCard } from "./offer-card";
import type { OfferCard as OfferCardType } from "@/types";

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

const mockOffer: OfferCardType = {
  title: "Kochkurse",
  description: "Entdecke die Welt der Aromen in kleinen, individuellen Kursen.",
  ctaLabel: "Zu den Kursen",
  ctaHref: "/aktuelle-kurse",
  image: "https://placehold.co/800x600?text=Test",
};

describe("OfferCard", () => {
  it("renders the title", () => {
    render(<OfferCard offer={mockOffer} />);
    expect(screen.getByText("Kochkurse")).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<OfferCard offer={mockOffer} />);
    expect(screen.getByText(/Entdecke die Welt/)).toBeInTheDocument();
  });

  it("renders the CTA link with correct href", () => {
    render(<OfferCard offer={mockOffer} />);
    const link = screen.getByRole("link", { name: "Zu den Kursen" });
    expect(link).toHaveAttribute("href", "/aktuelle-kurse");
  });
});
