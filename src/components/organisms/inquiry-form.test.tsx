import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { InquiryForm } from "./inquiry-form";

describe("InquiryForm", () => {
  it("renders all required form fields", () => {
    render(<InquiryForm />);
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-Mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Anlass/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Wunschdatum/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Anzahl Personen/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nachricht/i)).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    render(<InquiryForm />);
    expect(
      screen.getByRole("button", { name: /Anfrage absenden/i }),
    ).toBeInTheDocument();
  });

  it("updates input values on change", async () => {
    render(<InquiryForm />);
    const nameInput = screen.getByLabelText(/Name/i);
    await userEvent.type(nameInput, "Anna Müller");
    expect(nameInput).toHaveValue("Anna Müller");
  });

  it("renders all occasion options", () => {
    render(<InquiryForm />);
    const select = screen.getByLabelText(/Anlass/i);
    expect(select).toBeInTheDocument();
    ["Geburtstag", "Teamevent", "Hochzeit", "Firmenfeier", "Sonstiges"].forEach(
      (option) => {
        expect(screen.getByRole("option", { name: option })).toBeInTheDocument();
      },
    );
  });

  it("shows success message after form submission", async () => {
    render(<InquiryForm />);
    await userEvent.click(screen.getByRole("button", { name: /Anfrage absenden/i }));
    expect(screen.getByText(/Vielen Dank für deine Anfrage/i)).toBeInTheDocument();
  });

  it("hides the form after successful submission", async () => {
    render(<InquiryForm />);
    await userEvent.click(screen.getByRole("button", { name: /Anfrage absenden/i }));
    expect(
      screen.queryByRole("button", { name: /Anfrage absenden/i }),
    ).not.toBeInTheDocument();
  });
});
