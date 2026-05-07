import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Navbar } from "./navbar";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    onClick,
  }: {
    children: React.ReactNode;
    href: string;
    onClick?: () => void;
  }) => (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  ),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("Navbar", () => {
  it("renders the site name", () => {
    render(<Navbar />);
    expect(screen.getByText("Kochatelier")).toBeInTheDocument();
  });

  it("renders the desktop navigation links", () => {
    render(<Navbar />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Eventlocation")).toBeInTheDocument();
    expect(screen.getByText("Catering")).toBeInTheDocument();
    expect(screen.getByText("Gutscheine")).toBeInTheDocument();
  });

  it("renders the mobile menu button", () => {
    render(<Navbar />);
    expect(
      screen.getByRole("button", { name: /Menü öffnen/i }),
    ).toBeInTheDocument();
  });

  it("opens mobile menu on button click", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const menuButton = screen.getByRole("button", { name: /Menü öffnen/i });
    await user.click(menuButton);
    expect(
      screen.getByRole("navigation", { name: /Mobile Navigation/i }),
    ).toBeInTheDocument();
  });

  it("closes mobile menu on second click", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const menuButton = screen.getByRole("button", { name: /Menü öffnen/i });
    await user.click(menuButton);
    await user.click(screen.getByRole("button", { name: /Menü schließen/i }));
    expect(
      screen.queryByRole("navigation", { name: /Mobile Navigation/i }),
    ).not.toBeInTheDocument();
  });

  it("closes mobile menu when logo link is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getByRole("button", { name: /Menü öffnen/i }));
    expect(
      screen.getByRole("navigation", { name: /Mobile Navigation/i }),
    ).toBeInTheDocument();
    await user.click(screen.getByText("Kochatelier"));
    expect(
      screen.queryByRole("navigation", { name: /Mobile Navigation/i }),
    ).not.toBeInTheDocument();
  });

  it("closes mobile menu when a mobile nav link is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getByRole("button", { name: /Menü öffnen/i }));
    const mobileNav = screen.getByRole("navigation", {
      name: /Mobile Navigation/i,
    });
    const mobileLinks = mobileNav.querySelectorAll("a");
    await user.click(mobileLinks[0]);
    expect(
      screen.queryByRole("navigation", { name: /Mobile Navigation/i }),
    ).not.toBeInTheDocument();
  });

  it("opens dropdown on click", () => {
    render(<Navbar />);
    fireEvent.click(screen.getByRole("button", { name: /Kurse/i }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByText("Aktuelle Kurse")).toBeInTheDocument();
  });

  it("opens dropdown on mouse enter", async () => {
    render(<Navbar />);
    const kursButton = screen.getByRole("button", { name: /Kurse/i });
    fireEvent.mouseEnter(kursButton);
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("closes dropdown on mouse leave", async () => {
    render(<Navbar />);
    const kursButton = screen.getByRole("button", { name: /Kurse/i });
    fireEvent.mouseEnter(kursButton);
    expect(screen.getByRole("menu")).toBeInTheDocument();
    const dropdown = kursButton.closest(".relative")!;
    fireEvent.mouseLeave(dropdown);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});
