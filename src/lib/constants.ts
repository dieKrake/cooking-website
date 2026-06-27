import type { NavItem, ContactInfo } from "@/types";

export const SITE_NAME = "Culina";
export const SITE_DESCRIPTION =
  "Familiäre Kochkurse, einzigartiges Catering und unvergessliche Feinkost-Genussmomente";

export const CONTACT_INFO: ContactInfo = {
  email: "kontakt@culina.de",
  phone: "+49 123 456 789",
  address: {
    street: "Bahnhofstraße 38",
    zip: "73430",
    city: "Aalen",
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
  { label: "Feinkost", href: "/feinkost" },
  { label: "Gutscheine", href: "/gutscheine" },
  { label: "Über mich", href: "/ueber-mich" },
];

export const FOOTER_LEGAL_LINKS = [
  { label: "AGB", href: "/agb" },
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
];
