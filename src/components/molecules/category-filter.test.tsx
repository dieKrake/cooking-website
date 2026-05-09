import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { CategoryFilter } from "./category-filter";

const categories = ["Italienisch", "Japanisch", "Spanisch"];

describe("CategoryFilter", () => {
  it("renders an 'Alle' button", () => {
    render(<CategoryFilter categories={categories} active="Alle" onChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Alle" })).toBeInTheDocument();
  });

  it("renders a button for each category", () => {
    render(<CategoryFilter categories={categories} active="Alle" onChange={vi.fn()} />);
    categories.forEach((cat) => {
      expect(screen.getByRole("button", { name: cat })).toBeInTheDocument();
    });
  });

  it("calls onChange with the selected category", async () => {
    const onChange = vi.fn();
    render(<CategoryFilter categories={categories} active="Alle" onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Italienisch" }));
    expect(onChange).toHaveBeenCalledWith("Italienisch");
  });

  it("calls onChange with 'Alle' when clicking the Alle button", async () => {
    const onChange = vi.fn();
    render(<CategoryFilter categories={categories} active="Italienisch" onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Alle" }));
    expect(onChange).toHaveBeenCalledWith("Alle");
  });
});
