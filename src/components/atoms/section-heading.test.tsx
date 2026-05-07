import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SectionHeading } from "./section-heading";

describe("SectionHeading", () => {
  it("renders the title", () => {
    render(<SectionHeading title="Aktuelle Kurse" />);
    expect(screen.getByRole("heading", { name: "Aktuelle Kurse" })).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    render(<SectionHeading title="Kurse" subtitle="Alle verfügbaren Kurse" />);
    expect(screen.getByText("Alle verfügbaren Kurse")).toBeInTheDocument();
  });

  it("does not render subtitle when omitted", () => {
    render(<SectionHeading title="Kurse" />);
    expect(screen.queryByText(/verfügbaren/)).not.toBeInTheDocument();
  });
});
