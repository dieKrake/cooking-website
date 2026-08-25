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

  it("renders the remaining legal links without AGB", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Impressum" })).toHaveAttribute(
      "href",
      "/impressum",
    );
    expect(screen.getByRole("link", { name: "Datenschutz" })).toHaveAttribute(
      "href",
      "/datenschutz",
    );
    expect(screen.queryByText("AGB")).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "AGB" })).not.toBeInTheDocument();
  });

  it("renders the copyright notice", () => {
    render(<Footer />);
    expect(screen.getByText(/Alle Rechte vorbehalten/i)).toBeInTheDocument();
  });
});
