import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Footer } from "./footer";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

describe("Footer", () => {
  it("renders the site name", () => {
    render(<Footer />);
    expect(screen.getByAltText("Culina")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Footer />);
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("renders all legal links", () => {
    render(<Footer />);
    expect(screen.getByText("AGB")).toBeInTheDocument();
    expect(screen.getByText("Impressum")).toBeInTheDocument();
    expect(screen.getByText("Datenschutz")).toBeInTheDocument();
  });

  it("renders the copyright notice", () => {
    render(<Footer />);
    expect(screen.getByText(/Alle Rechte vorbehalten/i)).toBeInTheDocument();
  });
});
