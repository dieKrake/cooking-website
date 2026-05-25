import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import DatenschutzPage from "./page";

describe("DatenschutzPage", () => {
  it("renders the h1 heading", () => {
    render(<DatenschutzPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /Datenschutzerklärung/i }),
    ).toBeInTheDocument();
  });

  it("renders the Verantwortlicher section", () => {
    render(<DatenschutzPage />);
    expect(screen.getByText(/1. Verantwortlicher/)).toBeInTheDocument();
  });

  it("renders the DSGVO rights list", () => {
    render(<DatenschutzPage />);
    expect(screen.getByText(/Art. 15 DSGVO/)).toBeInTheDocument();
    expect(screen.getByText(/Art. 17 DSGVO/)).toBeInTheDocument();
  });

  it("renders the cookies section", () => {
    render(<DatenschutzPage />);
    expect(screen.getByText(/6. Cookies und Analyse/)).toBeInTheDocument();
  });

  it("renders contact email for rights requests", () => {
    render(<DatenschutzPage />);
    expect(screen.getAllByText(/kontakt@culina\.de/).length).toBeGreaterThan(0);
  });
});
