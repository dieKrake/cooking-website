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
  },
  { label: "Eventlocation", href: "/eventlocation" },
  { label: "Feinkost", href: "/feinkost" },
  { label: "Über mich", href: "/ueber-mich" },
];

export const FOOTER_LEGAL_LINKS = [
  { label: "AGB", href: "/agb" },
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
];
