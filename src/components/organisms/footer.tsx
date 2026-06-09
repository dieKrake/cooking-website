import Link from "next/link";
import Image from "next/image";
import {
  SITE_NAME,
  SITE_DESCRIPTION,
  NAV_ITEMS,
  FOOTER_LEGAL_LINKS,
} from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-background mt-auto border-t">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col items-start">
            <Link href="/" className="inline-block pb-4 md:pb-2 lg:pb-4">
              <Image
                src="/images/Culina-Logo.png"
                alt={SITE_NAME}
                width={200}
                height={80}
                className="h-auto w-72 object-contain md:w-40 lg:w-68"
              />
            </Link>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              {SITE_DESCRIPTION}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-foreground text-sm font-semibold tracking-wider uppercase">
              Navigation
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-foreground text-sm font-semibold tracking-wider uppercase">
              Rechtliches
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {FOOTER_LEGAL_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-border mt-16 border-t pt-8">
          <p className="text-muted-foreground text-center text-xs">
            &copy; {new Date().getFullYear()} {SITE_NAME}. Alle Rechte
            vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
