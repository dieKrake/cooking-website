import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AgbPage from "./page";

describe("AgbPage", () => {
  it("renders the h1 heading", () => {
    render(<AgbPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /Allgemeine Geschäftsbedingungen/i }),
    ).toBeInTheDocument();
  });

  it("renders paragraph about Geltungsbereich", () => {
    render(<AgbPage />);
    expect(screen.getByText(/§ 1 Geltungsbereich/)).toBeInTheDocument();
  });

  it("renders paragraph about Stornierung", () => {
    render(<AgbPage />);
    expect(screen.getByText(/§ 4 Stornierung/)).toBeInTheDocument();
  });

  it("renders the cancellation fee list", () => {
    render(<AgbPage />);
    expect(screen.getByText(/50 % des Kurspreises/)).toBeInTheDocument();
    expect(screen.getByText(/100 % des Kurspreises/)).toBeInTheDocument();
  });

  it("renders the voucher validity paragraph", () => {
    render(<AgbPage />);
    expect(screen.getByText(/3 Jahre gültig/)).toBeInTheDocument();
  });
});
