"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, SITE_NAME } from "@/lib/constants";
import type { NavItem } from "@/types";

interface NavDropdownProps {
  item: NavItem;
}

function NavDropdown({ item }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="relative" onMouseLeave={() => setOpen(false)}>
      <button
        className={cn(
          "flex items-center gap-1 text-sm font-medium transition-colors hover:text-foreground/80",
          pathname.startsWith(item.href)
            ? "text-foreground"
            : "text-foreground/60",
        )}
        onMouseEnter={() => setOpen(true)}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {item.label}
        <ChevronDown className="h-3 w-3" />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-40 rounded-md border bg-background shadow-md">
          <ul role="menu">
            {item.children?.map((child) => (
              <li key={child.href} role="menuitem">
                <Link
                  href={child.href}
                  className="block px-4 py-2 text-sm transition-colors hover:bg-muted"
                  onClick={() => setOpen(false)}
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight"
          onClick={() => setMobileOpen(false)}
        >
          {SITE_NAME}
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Hauptnavigation">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <NavDropdown key={item.href} item={item} />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground/80",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-foreground/60",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <button
          className="flex items-center justify-center rounded-md p-2 md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-menu"
          className="border-t bg-background md:hidden"
          aria-label="Mobile Navigation"
        >
          <ul className="flex flex-col px-4 py-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "block py-2 text-sm font-medium transition-colors hover:text-foreground/80",
                    pathname === item.href
                      ? "text-foreground"
                      : "text-foreground/60",
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="ml-4 flex flex-col">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className={cn(
                            "block py-1.5 text-sm transition-colors hover:text-foreground/80",
                            pathname === child.href
                              ? "text-foreground"
                              : "text-foreground/60",
                          )}
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
