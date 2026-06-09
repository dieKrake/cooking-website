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
    <footer className="bg-deep-black border-pure-white/10 mt-auto border-t">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col items-start">
            <Link href="/" className="inline-block pb-4 md:pb-2 lg:pb-4">
              {/* Full SVG logo for lg and larger (desktop) */}
              <Image
                src="/images/Culina-Logo.svg"
                alt={SITE_NAME}
                width={200}
                height={80}
                className="hidden h-auto w-80 object-contain lg:block"
                style={{ height: "auto" }}
              />
              {/* Cropped PNG logo for smaller screens (under lg) */}
              <Image
                src="/images/Culina-Logo-cut.png"
                alt={`${SITE_NAME} Logo`}
                width={150}
                height={50}
                className="h-auto w-40 object-contain md:w-32 lg:hidden"
                style={{ height: "auto" }}
              />
            </Link>
            <p className="text-pure-white/70 mt-3 text-sm leading-relaxed">
              {SITE_DESCRIPTION}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-pure-white text-sm font-semibold tracking-wider uppercase">
              Navigation
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-pure-white/70 hover:text-pasta-gelb text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-pure-white text-sm font-semibold tracking-wider uppercase">
              Rechtliches
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {FOOTER_LEGAL_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-pure-white/70 hover:text-pasta-gelb text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-pure-white/10 mt-16 border-t pt-8">
          <p className="text-pure-white/70 text-center text-xs">
            &copy; {new Date().getFullYear()} {SITE_NAME}. Alle Rechte
            vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
