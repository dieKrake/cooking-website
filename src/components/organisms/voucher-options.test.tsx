import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { VoucherOptions } from "./voucher-options";

describe("VoucherOptions", () => {
  it("renders all preset voucher amounts", () => {
    render(<VoucherOptions />);
    expect(screen.getByText("50 €")).toBeInTheDocument();
    expect(screen.getByText("100 €")).toBeInTheDocument();
    expect(screen.getByText("150 €")).toBeInTheDocument();
  });

  it("renders the section heading", () => {
    render(<VoucherOptions />);
    expect(screen.getByText("Erhältliche Gutscheine")).toBeInTheDocument();
  });
});
