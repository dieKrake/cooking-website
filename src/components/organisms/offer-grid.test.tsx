import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { OfferGrid } from "./offer-grid";

describe("OfferGrid", () => {
  it("renders the offer cards in the correct order", () => {
    render(<OfferGrid />);
    const cards = screen.getAllByRole("article");
    expect(cards).toHaveLength(4);
    expect(
      within(cards[0]).getByRole("heading", { name: "Kochkurse in Aalen" }),
    ).toBeInTheDocument();
    expect(
      within(cards[1]).getByRole("heading", {
        name: "Eventlocation in Aalen",
      }),
    ).toBeInTheDocument();
    expect(
      within(cards[2]).getByRole("heading", { name: "Catering in Aalen" }),
    ).toBeInTheDocument();
    expect(
      within(cards[3]).getByRole("heading", {
        name: "Feinkost bester Qualität",
      }),
    ).toBeInTheDocument();
  });

  it("renders the eventlocation card with its CTA and hero image", () => {
    render(<OfferGrid />);
    expect(
      screen.getByRole("link", { name: /Location entdecken/ }),
    ).toHaveAttribute("href", "/eventlocation");
    const image = screen.getByRole("img", {
      name: "Eventlocation von Culina in Aalen",
    });
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("location-hero.jpeg"),
    );
  });

  it("renders the catering card with its CTA and image", () => {
    render(<OfferGrid />);
    expect(
      screen.getByRole("link", { name: /Catering anfragen/ }),
    ).toHaveAttribute("href", "/catering");
    const image = screen.getByRole("img", {
      name: "Dessert beim Catering von Culina",
    });
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("kochkurs-dessert.webp"),
    );
  });

  it("keeps the feinkost card linked to /feinkost on the last position", () => {
    render(<OfferGrid />);
    const cards = screen.getAllByRole("article");
    expect(within(cards[3]).getByText("04")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Feinkost entdecken/ }),
    ).toHaveAttribute("href", "/feinkost");
  });

  it("updates edge fades while scrolling", () => {
    const { container } = render(<OfferGrid />);
    const scrollContainer = container.querySelector(
      ".lg\\:overflow-x-auto",
    ) as HTMLDivElement;
    Object.defineProperties(scrollContainer, {
      clientWidth: { configurable: true, value: 400 },
      scrollWidth: { configurable: true, value: 1400 },
    });

    fireEvent.scroll(scrollContainer, { target: { scrollLeft: 100 } });
    const fades = container.querySelectorAll(".pointer-events-none");
    expect(fades[0]).toHaveStyle({ opacity: "1" });
    expect(fades[1]).toHaveStyle({ opacity: "1" });

    fireEvent.scroll(scrollContainer, { target: { scrollLeft: 0 } });
    expect(fades[0]).toHaveStyle({ opacity: "0" });
  });
});
