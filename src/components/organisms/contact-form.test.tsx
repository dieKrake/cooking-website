import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ContactForm } from "./contact-form";
import {
  CONTACT_FORM,
  INQUIRY_FORM,
  CATERING_FORM,
} from "@/lib/form-configs";

beforeEach(() => {
  vi.restoreAllMocks();
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) }),
  );
});

describe("ContactForm (contact config)", () => {
  it("renders the section with provided id", () => {
    const { container } = render(
      <ContactForm config={CONTACT_FORM} id="kontakt" />,
    );
    expect(container.querySelector("#kontakt")).toBeInTheDocument();
  });

  it("renders contact info when showContactInfo is true", () => {
    render(<ContactForm config={CONTACT_FORM} />);
    expect(screen.getByText(/kontakt@culina\.de/i)).toBeInTheDocument();
    expect(screen.getByText(/\+49/)).toBeInTheDocument();
    expect(screen.getByText(/Aalen/i)).toBeInTheDocument();
  });

  it("renders all configured fields and submit button", () => {
    render(<ContactForm config={CONTACT_FORM} />);
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-Mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nachricht/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Nachricht senden/i }),
    ).toBeInTheDocument();
  });

  it("shows success message and hides the form after submission", async () => {
    render(<ContactForm config={CONTACT_FORM} />);
    await userEvent.type(screen.getByLabelText(/Name/i), "Max");
    await userEvent.type(screen.getByLabelText(/E-Mail/i), "max@test.de");
    await userEvent.type(screen.getByLabelText(/Nachricht/i), "Hallo!");
    await userEvent.click(
      screen.getByRole("button", { name: /Nachricht senden/i }),
    );
    expect(await screen.findByText(/Nachricht gesendet/i)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Nachricht senden/i }),
    ).not.toBeInTheDocument();
  });

  it("sends type and title in the payload", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue({ ok: true, json: async () => ({}) });
    vi.stubGlobal("fetch", fetchMock);
    render(<ContactForm config={CONTACT_FORM} />);
    await userEvent.type(screen.getByLabelText(/Name/i), "Max");
    await userEvent.type(screen.getByLabelText(/E-Mail/i), "max@test.de");
    await userEvent.type(screen.getByLabelText(/Nachricht/i), "Hallo!");
    await userEvent.click(
      screen.getByRole("button", { name: /Nachricht senden/i }),
    );
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.type).toBe("contact");
    expect(body.title).toBe("Kontakt");
  });

  it("validates required fields", async () => {
    render(<ContactForm config={CONTACT_FORM} />);
    await userEvent.click(
      screen.getByRole("button", { name: /Nachricht senden/i }),
    );
    expect(screen.getByText(/Bitte gib deinen Namen ein/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Bitte gib deine E-Mail-Adresse ein/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Bitte schreib uns eine Nachricht/i),
    ).toBeInTheDocument();
  });

  it("validates email format", async () => {
    render(<ContactForm config={CONTACT_FORM} />);
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

  it("clears an error when the field is corrected", async () => {
    render(<ContactForm config={CONTACT_FORM} />);
    await userEvent.click(
      screen.getByRole("button", { name: /Nachricht senden/i }),
    );
    expect(screen.getByText(/Bitte gib deinen Namen ein/i)).toBeInTheDocument();
    await userEvent.type(screen.getByLabelText(/Name/i), "Max");
    expect(
      screen.queryByText(/Bitte gib deinen Namen ein/i),
    ).not.toBeInTheDocument();
  });

  it("shows an error message when the request fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValueOnce(new Error("Network error")),
    );
    render(<ContactForm config={CONTACT_FORM} />);
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

describe("ContactForm (inquiry config)", () => {
  it("renders the location-specific title and fields", () => {
    render(<ContactForm config={INQUIRY_FORM} />);
    expect(
      screen.getByRole("heading", { name: /Location anfragen/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Anlass/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Wunschdatum/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Anzahl Personen/i)).toBeInTheDocument();
  });

  it("validates missing date and guests", async () => {
    render(<ContactForm config={INQUIRY_FORM} />);
    await userEvent.type(screen.getByLabelText(/Name/i), "Anna");
    await userEvent.type(screen.getByLabelText(/E-Mail/i), "anna@test.de");
    await userEvent.selectOptions(
      screen.getByLabelText(/Anlass/i),
      "Geburtstag",
    );
    await userEvent.click(
      screen.getByRole("button", { name: /Anfrage absenden/i }),
    );
    expect(screen.getByText(/Bitte gib ein Wunschdatum an/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Bitte gib die Anzahl der Personen an/i),
    ).toBeInTheDocument();
  });
});

describe("ContactForm (catering config)", () => {
  it("submits successfully with valid data", async () => {
    render(<ContactForm config={CATERING_FORM} />);
    await userEvent.type(screen.getByLabelText(/Name/i), "Max");
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
      await screen.findByText(/Vielen Dank für deine Anfrage/i),
    ).toBeInTheDocument();
  });
});
