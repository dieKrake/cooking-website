import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CtaButton } from "./cta-button";

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

describe("CtaButton", () => {
  it("renders a link with correct label", () => {
    render(<CtaButton href="/aktuelle-kurse" label="Zu den Kursen" />);
    const link = screen.getByRole("link", { name: "Zu den Kursen" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/aktuelle-kurse");
  });

  it("applies the default variant class", () => {
    render(<CtaButton href="/" label="Test" />);
    const link = screen.getByRole("link");
    expect(link.className).toContain("bg-primary");
  });

  it("applies outline variant class", () => {
    render(<CtaButton href="/" label="Test" variant="outline" />);
    const link = screen.getByRole("link");
    expect(link.className).toContain("border-border");
  });
});
