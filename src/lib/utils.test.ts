import { describe, it, expect } from "vitest";
import { formatDate } from "./utils";

describe("formatDate", () => {
  it("formats a date string to German long format", () => {
    expect(formatDate("2026-05-10")).toBe("10. Mai 2026");
  });

  it("formats different months correctly", () => {
    expect(formatDate("2026-12-24")).toBe("24. Dezember 2026");
    expect(formatDate("2026-01-01")).toBe("01. Januar 2026");
  });
});
