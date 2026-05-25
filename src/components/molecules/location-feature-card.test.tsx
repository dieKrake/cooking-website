import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LocationFeatureCard } from "./location-feature-card";
import type { LocationFeature } from "@/types";

const mockFeature: LocationFeature = {
  title: "110 m² Fläche",
};

describe("LocationFeatureCard", () => {
  it("renders the title", () => {
    render(<LocationFeatureCard feature={mockFeature} />);
    expect(screen.getByText("110 m² Fläche")).toBeInTheDocument();
  });
});
