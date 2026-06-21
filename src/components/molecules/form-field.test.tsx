import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { FormField } from "./form-field";
import type { FormFieldConfig } from "@/types";

const baseField: FormFieldConfig = {
  name: "name",
  label: "Name",
  type: "text",
  required: true,
  placeholder: "Dein Name",
};

describe("FormField", () => {
  it("renders a text input with label and required marker", () => {
    render(
      <FormField
        field={baseField}
        value=""
        idPrefix="contact"
        onChange={() => {}}
      />,
    );
    const input = screen.getByLabelText(/Name/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("id", "contact-name");
  });

  it("renders a textarea for type textarea", () => {
    render(
      <FormField
        field={{ name: "message", label: "Nachricht", type: "textarea" }}
        value="Hallo"
        idPrefix="contact"
        onChange={() => {}}
      />,
    );
    const textarea = screen.getByLabelText(/Nachricht/i);
    expect(textarea.tagName).toBe("TEXTAREA");
    expect(textarea).toHaveValue("Hallo");
  });

  it("renders select options including placeholder", () => {
    render(
      <FormField
        field={{
          name: "occasion",
          label: "Anlass",
          type: "select",
          placeholder: "Bitte wählen …",
          options: [{ label: "Geburtstag", value: "Geburtstag" }],
        }}
        value=""
        idPrefix="inquiry"
        onChange={() => {}}
      />,
    );
    expect(screen.getByText("Bitte wählen …")).toBeInTheDocument();
    expect(screen.getByText("Geburtstag")).toBeInTheDocument();
  });

  it("shows an error message and sets aria-invalid", () => {
    render(
      <FormField
        field={baseField}
        value=""
        error="Bitte gib deinen Namen ein."
        idPrefix="contact"
        onChange={() => {}}
      />,
    );
    expect(screen.getByText(/Bitte gib deinen Namen ein/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("calls onChange when the value changes", () => {
    const onChange = vi.fn();
    render(
      <FormField
        field={baseField}
        value=""
        idPrefix="contact"
        onChange={onChange}
      />,
    );
    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "Max" },
    });
    expect(onChange).toHaveBeenCalled();
  });
});
