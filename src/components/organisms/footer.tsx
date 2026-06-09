import Link from "next/link";
import Image from "next/image";
import { SITE_NAME, CONTACT_INFO, FOOTER_LEGAL_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-background mt-auto border-t">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link href="/" className="mb-4 inline-block">
              <Image
                src="/images/Culina-Logo.png"
                alt={SITE_NAME}
                width={120}
                height={40}
                className="h-10 w-auto object-contain"
                style={{ height: "auto" }}
              />
            </Link>
            <p className="text-muted-foreground mt-1 text-sm">
              {CONTACT_INFO.address.street}
            </p>
            <p className="text-muted-foreground text-sm">
              {CONTACT_INFO.address.zip} {CONTACT_INFO.address.city}
            </p>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="text-muted-foreground hover:text-foreground mt-2 block text-sm"
            >
              {CONTACT_INFO.email}
            </a>
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="text-muted-foreground hover:text-foreground block text-sm"
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
                    className="text-muted-foreground hover:text-foreground text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="text-muted-foreground mt-8 text-xs">
          © {new Date().getFullYear()} {SITE_NAME}. Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  );
}
