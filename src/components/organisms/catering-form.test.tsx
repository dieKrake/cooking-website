import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { CateringForm } from "./catering-form";

describe("CateringForm", () => {
  it("renders all form fields", () => {
    render(<CateringForm />);
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-Mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Telefon/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gewünschte Küche/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Wunschdatum/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Anzahl Personen/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nachricht/i)).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    render(<CateringForm />);
    expect(
      screen.getByRole("button", { name: /Anfrage absenden/i }),
    ).toBeInTheDocument();
  });

  it("updates input values on change", async () => {
    render(<CateringForm />);
    const nameInput = screen.getByLabelText(/Name/i);
    await userEvent.type(nameInput, "Max Mustermann");
    expect(nameInput).toHaveValue("Max Mustermann");
  });

  it("renders all cuisine options", () => {
    render(<CateringForm />);
    [
      "Orientalisch",
      "Asiatisch",
      "Mediterran",
      "Gesunde Küche",
      "Gemischt",
      "Sonstiges",
    ].forEach((option) => {
      expect(screen.getByRole("option", { name: option })).toBeInTheDocument();
    });
  });

  it("shows success message after form submission", async () => {
    render(<CateringForm />);
    await userEvent.type(screen.getByLabelText(/Name/i), "Max Mustermann");
    await userEvent.type(screen.getByLabelText(/E-Mail/i), "max@test.de");
    fireEvent.change(screen.getByLabelText(/Wunschdatum/i), {
      target: { value: "2026-12-01" },
    });
    fireEvent.change(screen.getByLabelText(/Anzahl Personen/i), {
      target: { value: "20" },
    });
    await userEvent.click(
      screen.getByRole("button", { name: /Anfrage absenden/i }),
    );
    expect(
      screen.getByText(/Vielen Dank für deine Anfrage/i),
    ).toBeInTheDocument();
  });

  it("hides the form after successful submission", async () => {
    render(<CateringForm />);
    await userEvent.type(screen.getByLabelText(/Name/i), "Max Mustermann");
    await userEvent.type(screen.getByLabelText(/E-Mail/i), "max@test.de");
    fireEvent.change(screen.getByLabelText(/Wunschdatum/i), {
      target: { value: "2026-12-01" },
    });
    fireEvent.change(screen.getByLabelText(/Anzahl Personen/i), {
      target: { value: "20" },
    });
    await userEvent.click(
      screen.getByRole("button", { name: /Anfrage absenden/i }),
    );
    expect(
      screen.queryByRole("button", { name: /Anfrage absenden/i }),
    ).not.toBeInTheDocument();
  });
});
