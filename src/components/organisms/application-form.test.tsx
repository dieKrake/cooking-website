import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
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
    await userEvent.type(
      screen.getByLabelText(/Kursidee/i),
      "Ich möchte einen Backkurs anbieten.",
    );
    await userEvent.click(
      screen.getByRole("button", { name: /Bewerbung absenden/i }),
    );
    expect(screen.getByText(/Danke für deine Bewerbung/i)).toBeInTheDocument();
  });

  it("hides the form after successful submission", async () => {
    render(<ApplicationForm />);
    await userEvent.type(screen.getByLabelText(/Name/i), "Max");
    await userEvent.type(screen.getByLabelText(/E-Mail/i), "max@example.com");
    await userEvent.type(
      screen.getByLabelText(/Kursidee/i),
      "Ich möchte einen Backkurs anbieten.",
    );
    await userEvent.click(
      screen.getByRole("button", { name: /Bewerbung absenden/i }),
    );
    expect(
      screen.queryByRole("button", { name: /Bewerbung absenden/i }),
    ).not.toBeInTheDocument();
  });

  it("shows validation error for empty name", async () => {
    render(<ApplicationForm />);
    await userEvent.type(screen.getByLabelText(/E-Mail/i), "max@example.com");
    await userEvent.type(screen.getByLabelText(/Kursidee/i), "Backkurs");
    await userEvent.click(
      screen.getByRole("button", { name: /Bewerbung absenden/i }),
    );
    expect(screen.getByText(/Bitte gib deinen Namen ein/i)).toBeInTheDocument();
  });

  it("shows validation error for empty email", async () => {
    render(<ApplicationForm />);
    await userEvent.type(screen.getByLabelText(/Name/i), "Max");
    await userEvent.type(screen.getByLabelText(/Kursidee/i), "Backkurs");
    await userEvent.click(
      screen.getByRole("button", { name: /Bewerbung absenden/i }),
    );
    expect(
      screen.getByText(/Bitte gib deine E-Mail-Adresse ein/i),
    ).toBeInTheDocument();
  });

  it("shows validation error for invalid email format", async () => {
    render(<ApplicationForm />);
    await userEvent.type(screen.getByLabelText(/Name/i), "Max");
    await userEvent.type(screen.getByLabelText(/E-Mail/i), "invalid-email");
    await userEvent.type(screen.getByLabelText(/Kursidee/i), "Backkurs");
    await userEvent.click(
      screen.getByRole("button", { name: /Bewerbung absenden/i }),
    );
    expect(
      screen.getByText(/Bitte gib eine gültige E-Mail-Adresse ein/i),
    ).toBeInTheDocument();
  });

  it("shows validation error for empty idea", async () => {
    render(<ApplicationForm />);
    await userEvent.type(screen.getByLabelText(/Name/i), "Max");
    await userEvent.type(screen.getByLabelText(/E-Mail/i), "max@example.com");
    await userEvent.click(
      screen.getByRole("button", { name: /Bewerbung absenden/i }),
    );
    expect(
      screen.getByText(/Bitte beschreibe deine Kursidee/i),
    ).toBeInTheDocument();
  });

  it("clears error message when user corrects the field", async () => {
    render(<ApplicationForm />);
    await userEvent.click(
      screen.getByRole("button", { name: /Bewerbung absenden/i }),
    );
    expect(screen.getByText(/Bitte gib deinen Namen ein/i)).toBeInTheDocument();
    await userEvent.type(screen.getByLabelText(/Name/i), "Max");
    expect(
      screen.queryByText(/Bitte gib deinen Namen ein/i),
    ).not.toBeInTheDocument();
  });

  it("shows error message when fetch fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValueOnce(new Error("Network error")),
    );
    render(<ApplicationForm />);
    await userEvent.type(screen.getByLabelText(/Name/i), "Max");
    await userEvent.type(screen.getByLabelText(/E-Mail/i), "max@example.com");
    await userEvent.type(screen.getByLabelText(/Kursidee/i), "Backkurs");
    await userEvent.click(
      screen.getByRole("button", { name: /Bewerbung absenden/i }),
    );
    expect(
      await screen.findByText(/Beim Senden ist ein Fehler aufgetreten/i),
    ).toBeInTheDocument();
  });
});
