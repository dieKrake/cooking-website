import React from "react";
import { render, screen } from "@testing-library/react";
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

vi.mock("framer-motion", () => ({
  motion: new Proxy(
    {},
    {
      get:
        (_target, tag: string) =>
        ({
          children,
          ...props
        }: React.HTMLAttributes<HTMLElement> & {
          children?: React.ReactNode;
        }) =>
          React.createElement(tag, props, children),
    },
  ),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

describe("Navbar", () => {
  it("renders the site name", () => {
    render(<Navbar />);
    expect(screen.getByAltText("Culina")).toBeInTheDocument();
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
    await user.click(screen.getByAltText("Culina"));
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
});
