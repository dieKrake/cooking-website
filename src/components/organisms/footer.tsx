import Link from "next/link";
import { SITE_NAME, CONTACT_INFO, FOOTER_LEGAL_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-bold">{SITE_NAME}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {CONTACT_INFO.address.street}
            </p>
            <p className="text-sm text-muted-foreground">
              {CONTACT_INFO.address.zip} {CONTACT_INFO.address.city}
            </p>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="mt-2 block text-sm text-muted-foreground hover:text-foreground"
            >
              {CONTACT_INFO.email}
            </a>
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="block text-sm text-muted-foreground hover:text-foreground"
            >
              {CONTACT_INFO.phone}
            </a>
          </div>

          <nav aria-label="Rechtliche Links">
            <ul className="flex flex-wrap gap-4">
              {FOOTER_LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {SITE_NAME}. Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  );
}
