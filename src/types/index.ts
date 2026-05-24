export interface Course {
  slug: string;
  title: string;
  description: string;
  date: string | null;
  time: string | null;
  location: string;
  price: number | null;
  image: string;
  instructor: string;
  hasFixedDate: boolean;
  category: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  externalUrl?: string;
}

export interface Benefit {
  title: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface OfferCard {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface PartnerLogo {
  name: string;
  image: string;
  url: string;
}

export interface LocationFeature {
  title: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  span?: "tall" | "wide" | "default";
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: {
    street: string;
    zip: string;
    city: string;
    country: string;
  };
}
