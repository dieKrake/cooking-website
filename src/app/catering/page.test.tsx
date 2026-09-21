import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CateringPage from "./page";

describe("CateringPage", () => {
  it("renders the image hero and inquiry CTA", () => {
    render(<CateringPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: /Catering in Aalen/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Gemeinsames Kochen bei Culina" }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "Catering anfragen" })[0],
    ).toHaveAttribute("href", "#catering-form");
  });

  it("keeps the catering content and form available", () => {
    render(<CateringPage />);

    expect(
      screen.getByRole("heading", { name: "Unsere Küchenwelten" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Firmenfeiern & Business-Events"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Catering anfragen" }),
    ).toBeInTheDocument();
    expect(document.getElementById("catering-form")).toBeInTheDocument();
  });
});
