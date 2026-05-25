import {
  Sun,
  Beef,
  Carrot,
  Leaf,
  Flame,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import type {
  Course,
  TeamMember,
  Benefit,
  OfferCard,
  GalleryImage,
  LocationFeature,
} from "@/types";

export const COURSES: Course[] = [
  {
    slug: "pizza-und-pasta",
    title: "Pizza & Pasta – Italiens Klassiker",
    description:
      "Lerne, wie echter Pizzateig und frische Pasta von Grund auf zubereitet werden. Mit hochwertigen Zutaten und viel Spaß.",
    date: "2026-05-10",
    time: "18:00 – 21:00",
    location: "Culina, Musterstraße 1, 65185 Wiesbaden",
    price: 89,
    image: "https://placehold.co/600x400?text=Pizza+%26+Pasta",
    instructor: "Luca M.",
    hasFixedDate: true,
    category: "Italienisch",
  },
  {
    slug: "sushi-kurs",
    title: "Sushi-Kurs – Die Kunst der japanischen Reisrollen",
    description:
      "Von Nigiri bis Maki: Tauche ein in die Welt des Sushi und lerne die wichtigsten Techniken direkt am Schneidebrett.",
    date: "2026-05-17",
    time: "17:00 – 20:00",
    location: "Culina, Musterstraße 1, 65185 Wiesbaden",
    price: 95,
    image: "https://placehold.co/600x400?text=Sushi+Kurs",
    instructor: "Vivian K.",
    hasFixedDate: true,
    category: "Japanisch",
  },
  {
    slug: "tapas-abend",
    title: "Tapas – Spaniens kleine Köstlichkeiten",
    description:
      "Viele kleine Teller, große Aromen: Gemeinsam kochen wir typische Tapas – perfekt zum Teilen, Probieren und Genießen.",
    date: "2026-05-24",
    time: "19:00 – 22:00",
    location: "Culina, Musterstraße 1, 65185 Wiesbaden",
    price: 85,
    image: "https://placehold.co/600x400?text=Tapas+Abend",
    instructor: "Pablo R.",
    hasFixedDate: true,
    category: "Spanisch",
  },
  {
    slug: "fermentieren",
    title: "Fermentieren & Sprudeln – Gemüse noch gesünder machen",
    description:
      "Lerne die uralte Kunst des Fermentierens: Kimchi, Sauerkraut, Kombucha und mehr – einfach, gesund und köstlich.",
    date: "2026-06-07",
    time: "11:00 – 14:00",
    location: "Culina, Musterstraße 1, 65185 Wiesbaden",
    price: 79,
    image: "https://placehold.co/600x400?text=Fermentieren",
    instructor: "Bettina F.",
    hasFixedDate: true,
    category: "Gesunde Küche",
  },
  {
    slug: "sauerteig-brot",
    title: "Sauerteig & Sonntagsbrunch – Brot backen mit Zeit & Gefühl",
    description:
      "Erlebe, wie echter Sauerteig entsteht und wie du daraus das perfekte Brot backst – mit anschließendem Brunch.",
    date: null,
    time: null,
    location: "Culina, Musterstraße 1, 65185 Wiesbaden",
    price: 89,
    image: "https://placehold.co/600x400?text=Sauerteig+Brot",
    instructor: "Arthur S.",
    hasFixedDate: false,
    category: "Backen",
  },
  {
    slug: "persische-kueche",
    title: "Persische Küche – Granatapfel, Safran & Seele",
    description:
      "Entdecke die bunte Vielfalt der iranischen Küche – würzig, aromatisch und voller Geschichten.",
    date: null,
    time: null,
    location: "Culina, Musterstraße 1, 65185 Wiesbaden",
    price: 95,
    image: "https://placehold.co/600x400?text=Persische+K%C3%BCche",
    instructor: "Zohre S.",
    hasFixedDate: false,
    category: "Persisch",
  },
  {
    slug: "wildkraeuter",
    title: "Frühlingserwachen in der Wildkräuterküche",
    description:
      "Vom Wegesrand auf den Teller: Wir sammeln und verarbeiten heimische Wildkräuter zu überraschend leckeren Gerichten.",
    date: "2026-06-14",
    time: "10:00 – 16:00",
    location: "Treffpunkt: Kurpark Wiesbaden",
    price: 110,
    image: "https://placehold.co/600x400?text=Wildkr%C3%A4uter",
    instructor: "Esther E.",
    hasFixedDate: true,
    category: "Natur & Küche",
  },
  {
    slug: "cocktail-kurs",
    title: "Cocktail Kurs – Shaken, Rühren & Mixen",
    description:
      "Ob mit oder ohne Alkohol – hier wird gemixt, probiert und gelacht. Dein perfekter Einstieg in die Welt der Cocktails.",
    date: "2026-05-31",
    time: "18:00 – 20:00",
    location: "Culina, Musterstraße 1, 65185 Wiesbaden",
    price: 79,
    image: "https://placehold.co/600x400?text=Cocktail+Kurs",
    instructor: "Marco T.",
    hasFixedDate: true,
    category: "Drinks",
  },
];

export const AKTUELLE_KURSE_PAGE = {
  title: "Aktuelle Kurse",
  description: "Alle aktuellen Kochkurse und Events im Culina Aalen.",
  intro:
    "Entdecke unsere Kochkurse – von internationaler Küche bis hin zu besonderen Themenabenden.",
};

export const PLACEHOLDER_TEAM: TeamMember[] = [
  {
    id: "bettina",
    name: "Bettina F.",
    role: "Ernährungsberaterin & Kursleitung",
    bio: "Zertifizierte Ernährungsberaterin und Fastenleiterin. Ihre Mission: Komplexes Ernährungswissen verständlich und alltagstauglich machen.",
    image: "https://placehold.co/400x400?text=Bettina",
    externalUrl: "https://www.google.com",
  },
  {
    id: "zohre",
    name: "Zohre S.",
    role: "Persische Küche – Kursleitung",
    bio: "Die ‚Gewürzpäpstin': Mit iranischen Wurzeln und internationalen Inspirationen teilt sie die Vielfalt persischer Aromen und Kochbücher.",
    image: "https://placehold.co/400x400?text=Zohre",
    externalUrl: "https://www.google.com",
  },
  {
    id: "luca",
    name: "Luca M.",
    role: "Italienische Küche – Kursleitung",
    bio: "Im Restaurant seiner Eltern aufgewachsen, führt er heute seine eigene Bottega. Er bringt echte italienische Handwerkskunst ins Kochatelier.",
    image: "https://placehold.co/400x400?text=Luca",
  },
  {
    id: "vivian",
    name: "Vivian K.",
    role: "Asiatische Küche – Kursleitung",
    bio: "Chinesische Wurzeln, in Laos geboren, in Deutschland aufgewachsen. Ob Sushi, Dim Sum oder Thai-Curry – Vivian vermittelt Handwerk und Heimatgefühl.",
    image: "https://placehold.co/400x400?text=Vivian",
  },
  {
    id: "esther",
    name: "Esther E.",
    role: "Wildkräuter & Natur – Kursleitung",
    bio: "Zertifizierte Kräuterpädagogin und Naturenthusiastin. Sie zeigt, wie Wildkräuter mit wenig Aufwand in die Alltagsküche integriert werden können.",
    image: "https://placehold.co/400x400?text=Esther",
    externalUrl: "https://www.google.com",
  },
];

export const PLACEHOLDER_BENEFITS: Benefit[] = [
  {
    title: "Zeig, was du kannst",
    description:
      "Führe Kurse durch, die deine Gäste begeistern, und mache Werbung für dein Restaurant, Catering oder Konzept.",
  },
  {
    title: "Deine Vision, unser Support",
    description:
      "Egal ob fertiges Kurskonzept oder noch in der Planung – wir helfen dir, deine Ideen auszuarbeiten und umzusetzen.",
  },
  {
    title: "Reichweite inklusive",
    description:
      "Mit professioneller Vermarktung erreichen wir die richtigen Teilnehmer für dich, damit du dich aufs Kochen konzentrieren kannst.",
  },
  {
    title: "Voll ausgestattet",
    description:
      "Unser modernes, stilvolles Kochatelier bietet dir alles – von hochwertigen Geräten bis zum perfekten Ambiente.",
  },
  {
    title: "Zusätzliche Unterstützung",
    description:
      "Auf Wunsch stellen wir dir einen Assistenten zur Seite, der die Gruppe optimal betreut.",
  },
];

export const PLACEHOLDER_OFFER_CARDS: OfferCard[] = [
  {
    title: "Kochkurse in Aalen",
    description:
      "Erlebe inspirierende Kochevents voller Genuss, Spaß und echter Begegnungen - mit Freunden, Familie oder Kollegen bei Culina (ehemals Koch Klub am Kocher)",
    ctaLabel: "Zu den Kursen",
    ctaHref: "/aktuelle-kurse",
  },
  {
    title: "Catering in die Region",
    description:
      "Unser Catering in Aalen und Umgebung bringt frische, kreative Küche direkt zu deinem Event. Vom entspannten Familienfest bis zum Firmenevent sorgen wir für genussvolle Momente mit persönlicher Note. ",
    ctaLabel: "Catering anfragen",
    ctaHref: "/catering",
  },
  {
    title: "Feinkost bester Qualität",
    description:
      "Entdecke ausgewählte Feinkost-Produkte, besondere Delikatessen und kulinarische Geschenkideen mit Geschmack. Perfekt für Genießer, besondere Anlässe oder ein Stück mediterranes Lebensgefühl für zuhause.",
    ctaLabel: "Feinkost entdecken",
    ctaHref: "/feinkost",
  },
];

export const CATERING_PAGE = {
  title: "Catering in Aalen – Frisch, regional und mit Liebe zum Genuss",
  description: "Catering in Aalen – Frisch, regional und mit Liebe zum Genuss",
  subtitle:
    "Kulinarisches Catering für Events, Firmenfeiern und besondere Anlässe",
  intro:
    "Mit unserem Catering bringen wir hochwertige, kreative und frisch zubereitete Küche direkt zu deinem Event. Ob Firmenfeier, Geburtstag, Business-Lunch oder private Veranstaltung – Culina bietet eine vielseitige Auswahl an Speisen, Snacks und Getränken für genussvolle Momente in besonderer Atmosphäre. Unsere Küche verbindet regionale Zutaten mit mediterranen Einflüssen, gutbürgerlichen Klassikern und modernen, kreativen Gerichten. Dabei legen wir besonderen Wert auf frische Produkte, hochwertige Qualität und eine abwechslungsreiche Auswahl für jeden Geschmack.",
  sectionTitle: "Unsere Küchenwelten",
  sectionSubtitle: "Für jeden Anlass die passende kulinarische Welt.",
  featuresIntro: "Unsere Eventlocation in Aalen eignet sich ideal für:",
  outro:
    "Mit viel Leidenschaft fürs Kochen und einem Gespür für Gastfreundschaft schaffen wir Catering-Erlebnisse, die in Erinnerung bleiben.",
};

export const CATERING_STYLES: Benefit[] = [
  {
    title: "Mediterrane Küche",
    description:
      "Frische Antipasti, mediterrane Feinkost, aromatische Kräuter und leichte Gerichte voller Genuss.",
    icon: Sun,
  },
  {
    title: "Gutbürgerliche Küche",
    description:
      "Regionale Klassiker modern interpretiert – herzhaft, hochwertig und mit viel Liebe gekocht.",
    icon: Beef,
  },
  {
    title: "Vegetarische Küche",
    description:
      "Kreative Gerichte mit frischem Gemüse, saisonalen Zutaten und abwechslungsreichen Geschmackskombinationen.",
    icon: Carrot,
  },
  {
    title: "Vegane Küche",
    description:
      "Moderne pflanzliche Speisen mit Fokus auf Frische, Qualität und bewussten Genuss.",
    icon: Leaf,
  },
  {
    title: "Moderne Fleischgerichte",
    description:
      "Hochwertige Fleischspezialitäten kombiniert mit kreativen Beilagen und zeitgemäßer Küche.",
    icon: Flame,
  },
  {
    title: "Kreative Fleischalternativen",
    description:
      "Innovative pflanzliche Alternativen mit überraschenden Aromen und moderner Interpretation.",
    icon: Sparkles,
  },
  {
    title: "Feinkost & Flying Buffet",
    description:
      "Kleine, stilvoll servierte Snacks und Delikatessen für lockere Events, Empfänge und besondere Genussmomente.",
    icon: UtensilsCrossed,
  },
];

export const PLACEHOLDER_GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "https://placehold.co/800x600?text=Kochstudio+%C3%9Cbersicht",
    alt: "Blick in das offene Kochstudio mit moderner Ausstattung",
    span: "wide",
  },
  {
    src: "https://placehold.co/600x800?text=K%C3%BCchenzeile",
    alt: "Professionelle Küchenzeile mit NEFF-Equipment",
    span: "tall",
  },
  {
    src: "https://placehold.co/600x400?text=Essbereich",
    alt: "Gemütlicher Essbereich für gemeinsame Genussmomente",
  },
  {
    src: "https://placehold.co/600x400?text=Kochinseln",
    alt: "Kochinseln für interaktive Kochkurse und Events",
  },
  {
    src: "https://placehold.co/800x600?text=Event+Atmosph%C3%A4re",
    alt: "Stimmungsvolle Atmosphäre bei einem Abend-Event",
    span: "wide",
  },
  {
    src: "https://placehold.co/600x400?text=Eingangsbereich",
    alt: "Einladender Eingangsbereich der Eventlocation",
  },
];

export const PLACEHOLDER_LOCATION_FEATURES: LocationFeature[] = [
  {
    title: "Firmenfeiern & Teamevents",
  },
  {
    title: "Geburtstage & private Feiern",
  },
  {
    title: "Kochkurse & Genussabende",
  },
  {
    title: "Networking-Events",
  },
  {
    title: "Kulinarische Workshops & Live Cooking",
  },
];

export const CATERING_FEATURES: LocationFeature[] = [
  {
    title: "Firmenfeiern & Business-Events",
  },
  {
    title: "Geburtstage & private Feiern",
  },
  {
    title: "Hochwertige Flying Buffets",
  },
  {
    title: "Empfänge & Networking-Events",
  },
  {
    title: "Kulinarische Genussabende",
  },
  {
    title: "Individuelle Eventkonzepte",
  },
];
