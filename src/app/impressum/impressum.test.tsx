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

  it("renders the TMG section", () => {
    render(<ImpressumPage />);
    expect(screen.getByText(/§ 5 TMG/)).toBeInTheDocument();
  });

  it("renders the address", () => {
    render(<ImpressumPage />);
    expect(screen.getAllByText(/Wiesbaden/).length).toBeGreaterThan(0);
  });

  it("renders the contact email", () => {
    render(<ImpressumPage />);
    expect(screen.getByText(/kontakt@culina\.de/)).toBeInTheDocument();
  });
});
