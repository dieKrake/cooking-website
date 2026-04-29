import type { NavItem, ContactInfo } from "@/types";

export const SITE_NAME = "Kochatelier";
export const SITE_DESCRIPTION =
  "Kreative Kochkurse, private Events und Catering in familiärer Atmosphäre.";

export const CONTACT_INFO: ContactInfo = {
  email: "kontakt@kochatelier.de",
  phone: "+49 123 456 789",
  address: {
    street: "Musterstraße 1",
    zip: "65185",
    city: "Wiesbaden",
    country: "Deutschland",
  },
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Kurse",
    href: "/aktuelle-kurse",
    children: [
      { label: "Aktuelle Kurse", href: "/aktuelle-kurse" },
      { label: "Unser Team", href: "/team" },
      { label: "Werde Kursleiter!", href: "/kursleiter-werden" },
    ],
  },
  { label: "Eventlocation", href: "/eventlocation" },
  { label: "Catering", href: "/catering" },
  { label: "Gutscheine", href: "/gutscheine" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Über uns", href: "/ueber-uns" },
];

export const FOOTER_LEGAL_LINKS = [
  { label: "AGB", href: "/agb" },
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
];
