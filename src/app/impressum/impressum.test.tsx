import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ImpressumPage from "./page";

describe("ImpressumPage", () => {
  it("renders the h1 heading", () => {
    render(<ImpressumPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Impressum" }),
    ).toBeInTheDocument();
  });

  it("renders the business details", () => {
    render(<ImpressumPage />);

    expect(screen.getByText(/Razvan George Pamfile/)).toBeInTheDocument();
    expect(screen.getByText(/Kochkurse & Feinkost/)).toBeInTheDocument();
    expect(screen.getByText(/Bahnhofstraße 38/)).toBeInTheDocument();
    expect(screen.getByText(/73430 Aalen/)).toBeInTheDocument();
  });

  it("renders the contact links", () => {
    render(<ImpressumPage />);

    expect(
      screen.getByRole("link", { name: "+49 (0) 1604031569" }),
    ).toHaveAttribute("href", "tel:+491604031569");
    expect(
      screen.getByRole("link", { name: "fabry@culina-aalen.de" }),
    ).toHaveAttribute("href", "mailto:fabry@culina-aalen.de");
  });

  it("renders the VAT ID and consumer dispute information", () => {
    render(<ImpressumPage />);

    expect(screen.getByText(/DE 463771474/)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Verbraucherstreitbeilegung/Universalschlichtungsstelle",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/nicht bereit oder verpflichtet/),
    ).toBeInTheDocument();
  });
});
