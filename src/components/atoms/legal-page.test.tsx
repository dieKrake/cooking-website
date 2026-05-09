import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LegalPage } from "./legal-page";

describe("LegalPage", () => {
  it("renders the title as h1", () => {
    render(<LegalPage title="Impressum"><p>Inhalt</p></LegalPage>);
    expect(screen.getByRole("heading", { level: 1, name: "Impressum" })).toBeInTheDocument();
  });

  it("renders children", () => {
    render(<LegalPage title="Test"><p>Test-Inhalt</p></LegalPage>);
    expect(screen.getByText("Test-Inhalt")).toBeInTheDocument();
  });
});
