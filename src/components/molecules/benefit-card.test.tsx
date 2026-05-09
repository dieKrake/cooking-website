import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BenefitCard } from "./benefit-card";
import type { Benefit } from "@/types";

const mockBenefit: Benefit = {
  title: "Zeig, was du kannst",
  description: "Führe Kurse durch, die deine Gäste begeistern.",
};

describe("BenefitCard", () => {
  it("renders the title", () => {
    render(<BenefitCard benefit={mockBenefit} />);
    expect(screen.getByText("Zeig, was du kannst")).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<BenefitCard benefit={mockBenefit} />);
    expect(screen.getByText(/Führe Kurse durch/)).toBeInTheDocument();
  });
});
