import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { VoucherForm } from "./voucher-form";

describe("VoucherForm", () => {
  it("renders all form fields", () => {
    render(<VoucherForm />);
    expect(screen.getByLabelText(/Betrag/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Format/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/beschenkten Person/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Persönliche Nachricht/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Dein Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Deine E-Mail/i)).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    render(<VoucherForm />);
    expect(screen.getByRole("button", { name: /Jetzt bestellen/i })).toBeInTheDocument();
  });

  it("renders all amount options", () => {
    render(<VoucherForm />);
    ["50 €", "75 €", "100 €", "150 €"].forEach((amount) => {
      expect(screen.getByRole("option", { name: amount })).toBeInTheDocument();
    });
  });

  it("renders digital and printed format options", () => {
    render(<VoucherForm />);
    expect(screen.getByRole("option", { name: /Digital/i })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /Gedruckt/i })).toBeInTheDocument();
  });

  it("updates input values on change", async () => {
    render(<VoucherForm />);
    const nameInput = screen.getByLabelText(/Dein Name/i);
    await userEvent.type(nameInput, "Max Mustermann");
    expect(nameInput).toHaveValue("Max Mustermann");
  });

  it("shows success message after form submission", async () => {
    render(<VoucherForm />);
    await userEvent.click(screen.getByRole("button", { name: /Jetzt bestellen/i }));
    expect(screen.getByText(/Bestellung eingegangen/i)).toBeInTheDocument();
  });

  it("hides the form after successful submission", async () => {
    render(<VoucherForm />);
    await userEvent.click(screen.getByRole("button", { name: /Jetzt bestellen/i }));
    expect(
      screen.queryByRole("button", { name: /Jetzt bestellen/i }),
    ).not.toBeInTheDocument();
  });
});
