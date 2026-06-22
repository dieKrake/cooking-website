import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { HeroSection } from "./hero-section";

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

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, style, className }: any) => (
      <div style={style} className={className}>
        {children}
      </div>
    ),
  },
  useScroll: () => ({
    scrollY: {
      get: () => 0,
      onChange: vi.fn(),
      destroy: vi.fn(),
    },
  }),
  useTransform: () => 0,
}));

describe("HeroSection", () => {
  const defaultProps = {
    title: "Willkommen im Kochatelier",
    subtitle: "Kreative Kochkurse in familiärer Atmosphäre.",
    primaryCta: { label: "Zu den Kursen", href: "/aktuelle-kurse" },
  };

  it("renders the heading", () => {
    render(<HeroSection {...defaultProps} />);
    expect(
      screen.getByRole("heading", { name: "Willkommen im Kochatelier" }),
    ).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(<HeroSection {...defaultProps} />);
    expect(screen.getByText(/Kreative Kochkurse/)).toBeInTheDocument();
  });

  it("renders the primary CTA link", () => {
    render(<HeroSection {...defaultProps} />);
    expect(screen.getByRole("link", { name: "Zu den Kursen" })).toHaveAttribute(
      "href",
      "/aktuelle-kurse",
    );
  });

  it("renders optional secondary CTA when provided", () => {
    render(
      <HeroSection
        {...defaultProps}
        secondaryCta={{ label: "Location ansehen", href: "/eventlocation" }}
      />,
    );
    expect(
      screen.getByRole("link", { name: "Location ansehen" }),
    ).toHaveAttribute("href", "/eventlocation");
  });

  it("does not render secondary CTA when omitted", () => {
    render(<HeroSection {...defaultProps} />);
    expect(screen.queryByText("Location ansehen")).not.toBeInTheDocument();
  });
});
