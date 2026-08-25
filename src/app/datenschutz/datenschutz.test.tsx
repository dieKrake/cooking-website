import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import DatenschutzPage from "./page";

describe("DatenschutzPage", () => {
  it("renders the document title and main sections", () => {
    render(<DatenschutzPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Datenschutzerklärung",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "1. Datenschutz auf einen Blick",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "7. Plugins und Tools",
      }),
    ).toBeInTheDocument();
  });

  it("renders the responsible party contact details", () => {
    render(<DatenschutzPage />);

    expect(screen.getByText(/Razvan George Pamfile/)).toBeInTheDocument();
    expect(screen.getByText(/Bahnhofstrasse 38/)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "+49 160 4031569" }),
    ).toHaveAttribute("href", "tel:+491604031569");
    expect(
      screen.getByRole("link", { name: "fabry@culina-aalen.de" }),
    ).toHaveAttribute("href", "mailto:fabry@culina-aalen.de");
  });

  it("renders the supplied privacy topics and server log data", () => {
    render(<DatenschutzPage />);

    expect(
      screen.getByRole("heading", { level: 3, name: "Externes Hosting" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Instagram" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Google Maps" }),
    ).toBeInTheDocument();
    expect(screen.getByText("IP-Adresse")).toBeInTheDocument();
    expect(screen.getByText(/Vercel GmbH/)).toBeInTheDocument();
  });

  it("renders external privacy URLs as secure external links", () => {
    render(<DatenschutzPage />);

    const link = screen.getByRole("link", {
      name: "https://www.facebook.com/legal/controller_addendum",
    });

    expect(link).toHaveAttribute(
      "href",
      "https://www.facebook.com/legal/controller_addendum",
    );
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("does not render PDF page numbers", () => {
    const { container } = render(<DatenschutzPage />);
    const content = container.textContent ?? "";

    expect(content).not.toMatch(/(?:2|3|4|5|6|7|8|9|10) \/ 12/);
  });
});
