import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { ApplicationForm } from "./application-form";

describe("ApplicationForm", () => {
  it("renders all form fields", () => {
    render(<ApplicationForm />);
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-Mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Telefon/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Kursidee/i)).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    render(<ApplicationForm />);
    expect(
      screen.getByRole("button", { name: /Bewerbung absenden/i }),
    ).toBeInTheDocument();
  });

  it("updates input values on change", async () => {
    render(<ApplicationForm />);
    const nameInput = screen.getByLabelText(/Name/i);
    await userEvent.type(nameInput, "Max Mustermann");
    expect(nameInput).toHaveValue("Max Mustermann");
  });

  it("shows success message after form submission", async () => {
    render(<ApplicationForm />);
    await userEvent.type(screen.getByLabelText(/Name/i), "Max");
    await userEvent.type(screen.getByLabelText(/E-Mail/i), "max@example.com");
    await userEvent.type(screen.getByLabelText(/Kursidee/i), "Ich möchte einen Backkurs anbieten.");
    await userEvent.click(screen.getByRole("button", { name: /Bewerbung absenden/i }));
    expect(screen.getByText(/Danke für deine Bewerbung/i)).toBeInTheDocument();
  });

  it("hides the form after successful submission", async () => {
    render(<ApplicationForm />);
    await userEvent.click(screen.getByRole("button", { name: /Bewerbung absenden/i }));
    expect(
      screen.queryByRole("button", { name: /Bewerbung absenden/i }),
    ).not.toBeInTheDocument();
  });
});
