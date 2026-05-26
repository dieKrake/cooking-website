import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
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
        expect(
          screen.getByRole("option", { name: option }),
        ).toBeInTheDocument();
      },
    );
  });

  it("shows success message after form submission", async () => {
    render(<InquiryForm />);
    await userEvent.type(screen.getByLabelText(/Name/i), "Anna Müller");
    await userEvent.type(screen.getByLabelText(/E-Mail/i), "anna@test.de");
    await userEvent.selectOptions(
      screen.getByLabelText(/Anlass/i),
      "Geburtstag",
    );
    fireEvent.change(screen.getByLabelText(/Wunschdatum/i), {
      target: { value: "2026-12-01" },
    });
    fireEvent.change(screen.getByLabelText(/Anzahl Personen/i), {
      target: { value: "10" },
    });
    await userEvent.click(
      screen.getByRole("button", { name: /Anfrage absenden/i }),
    );
    expect(
      screen.getByText(/Vielen Dank für deine Anfrage/i),
    ).toBeInTheDocument();
  });

  it("hides the form after successful submission", async () => {
    render(<InquiryForm />);
    await userEvent.type(screen.getByLabelText(/Name/i), "Anna Müller");
    await userEvent.type(screen.getByLabelText(/E-Mail/i), "anna@test.de");
    await userEvent.selectOptions(
      screen.getByLabelText(/Anlass/i),
      "Geburtstag",
    );
    fireEvent.change(screen.getByLabelText(/Wunschdatum/i), {
      target: { value: "2026-12-01" },
    });
    fireEvent.change(screen.getByLabelText(/Anzahl Personen/i), {
      target: { value: "10" },
    });
    await userEvent.click(
      screen.getByRole("button", { name: /Anfrage absenden/i }),
    );
    expect(
      screen.queryByRole("button", { name: /Anfrage absenden/i }),
    ).not.toBeInTheDocument();
  });

  it("shows validation error for empty name", async () => {
    render(<InquiryForm />);
    await userEvent.type(screen.getByLabelText(/E-Mail/i), "anna@test.de");
    await userEvent.selectOptions(
      screen.getByLabelText(/Anlass/i),
      "Geburtstag",
    );
    fireEvent.change(screen.getByLabelText(/Wunschdatum/i), {
      target: { value: "2026-12-01" },
    });
    fireEvent.change(screen.getByLabelText(/Anzahl Personen/i), {
      target: { value: "10" },
    });
    await userEvent.click(
      screen.getByRole("button", { name: /Anfrage absenden/i }),
    );
    expect(screen.getByText(/Bitte gib deinen Namen ein/i)).toBeInTheDocument();
  });

  it("shows validation error for invalid email", async () => {
    render(<InquiryForm />);
    await userEvent.type(screen.getByLabelText(/Name/i), "Anna");
    await userEvent.type(screen.getByLabelText(/E-Mail/i), "invalid");
    await userEvent.selectOptions(
      screen.getByLabelText(/Anlass/i),
      "Geburtstag",
    );
    fireEvent.change(screen.getByLabelText(/Wunschdatum/i), {
      target: { value: "2026-12-01" },
    });
    fireEvent.change(screen.getByLabelText(/Anzahl Personen/i), {
      target: { value: "10" },
    });
    await userEvent.click(
      screen.getByRole("button", { name: /Anfrage absenden/i }),
    );
    expect(
      screen.getByText(/Bitte gib eine gültige E-Mail-Adresse ein/i),
    ).toBeInTheDocument();
  });

  it("shows validation error for missing occasion", async () => {
    render(<InquiryForm />);
    await userEvent.type(screen.getByLabelText(/Name/i), "Anna");
    await userEvent.type(screen.getByLabelText(/E-Mail/i), "anna@test.de");
    fireEvent.change(screen.getByLabelText(/Wunschdatum/i), {
      target: { value: "2026-12-01" },
    });
    fireEvent.change(screen.getByLabelText(/Anzahl Personen/i), {
      target: { value: "10" },
    });
    await userEvent.click(
      screen.getByRole("button", { name: /Anfrage absenden/i }),
    );
    expect(
      screen.getByText(/Bitte wähle einen Anlass aus/i),
    ).toBeInTheDocument();
  });

  it("shows validation error for missing date", async () => {
    render(<InquiryForm />);
    await userEvent.type(screen.getByLabelText(/Name/i), "Anna");
    await userEvent.type(screen.getByLabelText(/E-Mail/i), "anna@test.de");
    await userEvent.selectOptions(
      screen.getByLabelText(/Anlass/i),
      "Geburtstag",
    );
    fireEvent.change(screen.getByLabelText(/Anzahl Personen/i), {
      target: { value: "10" },
    });
    await userEvent.click(
      screen.getByRole("button", { name: /Anfrage absenden/i }),
    );
    expect(
      screen.getByText(/Bitte gib ein Wunschdatum an/i),
    ).toBeInTheDocument();
  });

  it("shows validation error for missing guests", async () => {
    render(<InquiryForm />);
    await userEvent.type(screen.getByLabelText(/Name/i), "Anna");
    await userEvent.type(screen.getByLabelText(/E-Mail/i), "anna@test.de");
    await userEvent.selectOptions(
      screen.getByLabelText(/Anlass/i),
      "Geburtstag",
    );
    fireEvent.change(screen.getByLabelText(/Wunschdatum/i), {
      target: { value: "2026-12-01" },
    });
    await userEvent.click(
      screen.getByRole("button", { name: /Anfrage absenden/i }),
    );
    expect(
      screen.getByText(/Bitte gib die Anzahl der Personen an/i),
    ).toBeInTheDocument();
  });

  it("shows error message when fetch fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValueOnce(new Error("Network error")),
    );
    render(<InquiryForm />);
    await userEvent.type(screen.getByLabelText(/Name/i), "Anna");
    await userEvent.type(screen.getByLabelText(/E-Mail/i), "anna@test.de");
    await userEvent.selectOptions(
      screen.getByLabelText(/Anlass/i),
      "Geburtstag",
    );
    fireEvent.change(screen.getByLabelText(/Wunschdatum/i), {
      target: { value: "2026-12-01" },
    });
    fireEvent.change(screen.getByLabelText(/Anzahl Personen/i), {
      target: { value: "10" },
    });
    await userEvent.click(
      screen.getByRole("button", { name: /Anfrage absenden/i }),
    );
    expect(
      await screen.findByText(/Beim Senden ist ein Fehler aufgetreten/i),
    ).toBeInTheDocument();
  });
});
