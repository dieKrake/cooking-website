import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
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
    await userEvent.click(
      screen.getByRole("button", { name: /Nachricht senden/i }),
    );
    expect(screen.getByText(/Nachricht gesendet/i)).toBeInTheDocument();
  });

  it("hides the form after successful submission", async () => {
    render(<ContactSection />);
    await userEvent.click(
      screen.getByRole("button", { name: /Nachricht senden/i }),
    );
    expect(
      screen.queryByRole("button", { name: /Nachricht senden/i }),
    ).not.toBeInTheDocument();
  });
});
