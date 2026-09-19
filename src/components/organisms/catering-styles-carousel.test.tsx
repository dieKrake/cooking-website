import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CateringStylesCarousel } from "./catering-styles-carousel";

vi.mock("@/components/molecules/benefit-card", () => ({
  BenefitCard: ({ benefit }: { benefit: { title: string } }) => (
    <article>{benefit.title}</article>
  ),
}));

describe("CateringStylesCarousel", () => {
  it("updates edge fades while scrolling", () => {
    const { container } = render(<CateringStylesCarousel />);
    const scrollContainer = container.querySelector(".overflow-x-auto") as HTMLDivElement;
    Object.defineProperties(scrollContainer, {
      clientWidth: { configurable: true, value: 300 },
      scrollWidth: { configurable: true, value: 1000 },
      scrollLeft: { configurable: true, writable: true, value: 0 },
    });

    fireEvent.scroll(scrollContainer);
    const fades = container.querySelectorAll("[aria-hidden]");
    expect(fades[0]).toHaveStyle({ opacity: "0" });
    expect(fades[1]).toHaveStyle({ opacity: "1" });

    scrollContainer.scrollLeft = 100;
    fireEvent.scroll(scrollContainer);
    expect(fades[0]).toHaveStyle({ opacity: "1" });

    scrollContainer.scrollLeft = 700;
    fireEvent.scroll(scrollContainer);
    expect(fades[1]).toHaveStyle({ opacity: "0" });
  });

  it("renders every catering style", () => {
    render(<CateringStylesCarousel />);
    expect(screen.getAllByRole("article").length).toBeGreaterThan(0);
  });
});
