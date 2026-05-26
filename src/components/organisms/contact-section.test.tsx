import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ContactSection } from "./contact-section";

describe("ContactSection", () => {
  it("renders the section with id='kontakt'", () => {
    const { container } = render(<ContactSection />);
    expect(container.querySelector("#kontakt")).toBeInTheDocument();
  });

  it("renders contact info (email, phone, address)", () => {
    render(<ContactSection />);
    expect(screen.getByText(/kontakt@culina\.de/i)).toBeInTheDocument();
    expect(screen.getByText(/\+49/)).toBeInTheDocument();
    expect(screen.getByText(/Aalen/i)).toBeInTheDocument();
  });

  it("renders all form fields", () => {
    render(<ContactSection />);
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-Mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nachricht/i)).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    render(<ContactSection />);
    expect(
      screen.getByRole("button", { name: /Nachricht senden/i }),
    ).toBeInTheDocument();
  });

  it("updates input values on change", async () => {
    render(<ContactSection />);
    const nameInput = screen.getByLabelText(/Name/i);
    await userEvent.type(nameInput, "Max Mustermann");
    expect(nameInput).toHaveValue("Max Mustermann");
  });

  it("shows success message after form submission", async () => {
    render(<ContactSection />);
    await userEvent.type(screen.getByLabelText(/Name/i), "Max Mustermann");
    await userEvent.type(screen.getByLabelText(/E-Mail/i), "max@test.de");
    await userEvent.type(screen.getByLabelText(/Nachricht/i), "Hallo!");
    await userEvent.click(
      screen.getByRole("button", { name: /Nachricht senden/i }),
    );
    expect(screen.getByText(/Nachricht gesendet/i)).toBeInTheDocument();
  });

  it("hides the form after successful submission", async () => {
    render(<ContactSection />);
    await userEvent.type(screen.getByLabelText(/Name/i), "Max Mustermann");
    await userEvent.type(screen.getByLabelText(/E-Mail/i), "max@test.de");
    await userEvent.type(screen.getByLabelText(/Nachricht/i), "Hallo!");
    await userEvent.click(
      screen.getByRole("button", { name: /Nachricht senden/i }),
    );
    expect(
      screen.queryByRole("button", { name: /Nachricht senden/i }),
    ).not.toBeInTheDocument();
  });

  it("shows validation error for empty name", async () => {
    render(<ContactSection />);
    await userEvent.type(screen.getByLabelText(/E-Mail/i), "max@test.de");
    await userEvent.type(screen.getByLabelText(/Nachricht/i), "Hallo!");
    await userEvent.click(
      screen.getByRole("button", { name: /Nachricht senden/i }),
    );
    expect(screen.getByText(/Bitte gib deinen Namen ein/i)).toBeInTheDocument();
  });

  it("shows validation error for empty email", async () => {
    render(<ContactSection />);
    await userEvent.type(screen.getByLabelText(/Name/i), "Max");
    await userEvent.type(screen.getByLabelText(/Nachricht/i), "Hallo!");
    await userEvent.click(
      screen.getByRole("button", { name: /Nachricht senden/i }),
    );
    expect(
      screen.getByText(/Bitte gib deine E-Mail-Adresse ein/i),
    ).toBeInTheDocument();
  });

  it("shows validation error for invalid email format", async () => {
    render(<ContactSection />);
    await userEvent.type(screen.getByLabelText(/Name/i), "Max");
    await userEvent.type(screen.getByLabelText(/E-Mail/i), "invalid");
    await userEvent.type(screen.getByLabelText(/Nachricht/i), "Hallo!");
    await userEvent.click(
      screen.getByRole("button", { name: /Nachricht senden/i }),
    );
    expect(
      screen.getByText(/Bitte gib eine gültige E-Mail-Adresse ein/i),
    ).toBeInTheDocument();
  });

  it("shows validation error for empty message", async () => {
    render(<ContactSection />);
    await userEvent.type(screen.getByLabelText(/Name/i), "Max");
    await userEvent.type(screen.getByLabelText(/E-Mail/i), "max@test.de");
    await userEvent.click(
      screen.getByRole("button", { name: /Nachricht senden/i }),
    );
    expect(
      screen.getByText(/Bitte schreib uns eine Nachricht/i),
    ).toBeInTheDocument();
  });

  it("clears error message when user corrects the field", async () => {
    render(<ContactSection />);
    await userEvent.click(
      screen.getByRole("button", { name: /Nachricht senden/i }),
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
    render(<ContactSection />);
    await userEvent.type(screen.getByLabelText(/Name/i), "Max");
    await userEvent.type(screen.getByLabelText(/E-Mail/i), "max@test.de");
    await userEvent.type(screen.getByLabelText(/Nachricht/i), "Hallo!");
    await userEvent.click(
      screen.getByRole("button", { name: /Nachricht senden/i }),
    );
    expect(
      await screen.findByText(/Beim Senden ist ein Fehler aufgetreten/i),
    ).toBeInTheDocument();
  });
});
