import { render } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ScrollToTop } from "./scroll-to-top";

// Mock next/navigation
const mockUsePathname = vi.fn().mockReturnValue("/");
vi.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

describe("ScrollToTop", () => {
  let originalScrollTo: typeof window.scrollTo;

  beforeEach(() => {
    vi.useFakeTimers();
    // Spiegele window.scrollTo wider
    originalScrollTo = window.scrollTo;
    window.scrollTo = vi.fn();
    document.documentElement.style.scrollBehavior = "smooth";
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
    window.scrollTo = originalScrollTo;
    document.documentElement.style.scrollBehavior = "";
  });

  it("renders null without crashing", () => {
    const { container } = render(<ScrollToTop />);
    expect(container.firstChild).toBeNull();
  });

  it("calls window.scrollTo(0, 0) and sets scrollBehavior temporarily to auto", () => {
    mockUsePathname.mockReturnValue("/page-1");
    const { rerender } = render(<ScrollToTop />);

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    expect(document.documentElement.style.scrollBehavior).toBe("auto");

    // Nach Ablauf des Timers sollte smooth wiederhergestellt werden
    vi.advanceTimersByTime(51);
    expect(document.documentElement.style.scrollBehavior).toBe("smooth");
  });

  it("triggers scroll on path change", () => {
    mockUsePathname.mockReturnValue("/page-1");
    const { rerender } = render(<ScrollToTop />);
    expect(window.scrollTo).toHaveBeenCalledTimes(1);

    // Pathname ändert sich
    mockUsePathname.mockReturnValue("/page-2");
    rerender(<ScrollToTop />);

    expect(window.scrollTo).toHaveBeenCalledTimes(2);
  });
});
