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
    slug: "pasta",
    title: "Pasta – Italiens Klassiker",
    shortDescription:
      "Frische Pasta, perfekte Saucen und italienische Techniken – alles, was du für den Pastateller zuhause brauchst.",
    longDescription:
      "Lerne, wie frische Pasta von Grund auf zubereitet wird – vom Teigkneten bis zum Formen. Mit hochwertigen Zutaten und vielen Tipps für echte italienische Genussmomente.",
    date: "",
    time: "",
    price: 89,
    image: "/images/Zubereitung-Gurken-Culina.webp",
    instructor: "",
    hasFixedDate: true,
    category: "Italienisch",
  },
  {
    slug: "schwaebische-kueche",
    title: "Schwäbische Küche – Tradition und Wärme",
    shortDescription:
      "Maultaschen, Spätzle & Co. neu entdecken – herzhaft, bodenständig und mit viel schwäbischer Gastlichkeit.",
    longDescription:
      "Von Maultaschen bis Brezeln: Entdecke die herzliche Küche Schwabens mit Geschichte, Geschmack und viel Herz. Wir kochen Klassiker step-by-step und zeigen, wie sie modern interpretiert werden.",
    date: "",
    time: "",
    price: 85,
    image: "/images/Zubereitung-Brot-Culina.webp",
    instructor: "",
    hasFixedDate: true,
    category: "Deutsch",
  },
  {
    slug: "mediterane-kueche",
    title: "Mediterane Küche – Frische und Vielfalt",
    shortDescription:
      "Leichte mediterrane Gerichte mit viel Gemüse, Olivenöl und Kräutern – bereit für deinen Sommerabend zuhause.",
    longDescription:
      "Entdecke die vielfältige mediterrane Küche mit frischen Zutaten, aromatischen Gewürzen und gesunden Rezepten. Wir verbinden Mezze, Pasta & Fischgerichte zu einem genussvollen Menü.",
    date: "",
    time: "",
    price: 85,
    image: "/images/Zubereitung-Auberginen-Culina.webp",
    instructor: "",
    hasFixedDate: true,
    category: "Italienisch",
  },
  {
    slug: "vegane-kueche",
    title: "Vegane Küche – Frische und Vielfalt",
    shortDescription:
      "Pflanzliche Küche ohne Verzicht – bunt, saisonal und überraschend aromatisch.",
    longDescription:
      "Entdecke die vielfältige vegane Küche mit frischen Zutaten, aromatischen Gewürzen und gesunden Rezepten. Wir zeigen Texturen, Marinaden und moderne Teller, die auch Nicht-Veganer begeistern.",
    date: "",
    time: "",
    price: 85,
    image: "/images/Zubereitung-Tomaten-Culina.webp",
    instructor: "",
    hasFixedDate: true,
    category: "Italienisch",
  },
];

export const AKTUELLE_KURSE_PAGE = {
  title: "Unsere Kurse",
  description: "Alle unseren Kochkurse im Culina Aalen.",
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
    image: "/images/kochkurs-gericht-3.webp",
    imageAlt: "Menschen beim gemeinsamen Kochen in Aalen",
  },
  {
    title: "Catering in die Region",
    description:
      "Unser Catering in Aalen und Umgebung bringt frische, kreative Küche direkt zu deinem Event. Vom entspannten Familienfest bis zum Firmenevent sorgen wir für genussvolle Momente mit persönlicher Note. ",
    ctaLabel: "Catering anfragen",
    ctaHref: "/catering",
    image: "/images/Zubereitung-Edelstahlschalen-Culina.webp",
    imageAlt: "Catering-Buffet mit frischen Speisen",
  },
  {
    title: "Feinkost bester Qualität",
    description:
      "Entdecke ausgewählte Feinkost-Produkte, besondere Delikatessen und kulinarische Geschenkideen mit Geschmack. Perfekt für Genießer, besondere Anlässe oder ein Stück mediterranes Lebensgefühl für zuhause.",
    ctaLabel: "Feinkost entdecken",
    ctaHref: "/feinkost",
    image: "/images/Zubereitung-Oliven-Culina.webp",
    imageAlt: "Auswahl an hochwertigen Feinkost-Produkten",
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

export const EVENTLOCATION_PAGE = {
  title:
    "Unsere Eventlocation mitten in Aalen – Genussvolle Events in besonderer Atmosphäre",
  description:
    "Modernes Kochstudio für Firmenfeiern, private Events und gemeinsame Genussmomente in Aalen.",
  subtitle:
    "Modernes Kochstudio für Firmenfeiern, private Events und gemeinsame Genussmomente",
  intro:
    "Unser Kochstudio in Aalen verbindet moderne Ausstattung mit familiärer Atmosphäre und schafft den perfekten Rahmen für unvergessliche Events, Kochabende und Feiern. Ob Firmenevent, Geburtstag, Teamabend oder private Feier – unsere Eventlocation bietet Platz für bis zu 50 Personen und lädt zum gemeinsamen Genießen und Erleben ein. Die helle, offene Raumgestaltung sorgt für eine einladende Atmosphäre, in der sich Gäste sofort wohlfühlen. Hochwertiges Küchenequipment von NEFF ermöglicht professionelle Kochkurse, Live-Cooking-Erlebnisse und kulinarische Events auf höchstem Niveau.",
  flyingBuffet:
    "Besonders beliebt ist unser Flying Buffet: Statt eines klassischen Buffets werden kleine, frisch zubereitete Speisen direkt serviert und flexibel im Raum angeboten. So entsteht eine lockere, kommunikative Atmosphäre, in der sich Genuss und Austausch ganz natürlich verbinden.",
  featuresIntro: "Unsere Eventlocation in Aalen eignet sich ideal für:",
  outro:
    "Mit viel Liebe zum Detail schaffen wir einen Ort, an dem gutes Essen, gemeinsame Erlebnisse und echte Gastfreundschaft im Mittelpunkt stehen.",
};

export const GALLERY_IMAGES: GalleryImage[] = [
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

export const LOCATION_FEATURES: LocationFeature[] = [
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

export const FEINKOST_PAGE = {
  title: "Feinkost & Culina – Mediterraner Genuss in Premiumqualität",
  description:
    "Hochwertige Antipasti, Feinkost und Delikatessen von ilcesto bei Culina in Aalen.",
  subtitle: "Hochwertige Antipasti, Feinkost und Delikatessen von ilcesto",
  intro:
    "Bei Culina steht Genuss nicht nur beim gemeinsamen Kochen im Mittelpunkt, sondern auch bei ausgewählten Feinkost-Produkten mit echter Qualität. Deshalb arbeiten wir mit ilcesto zusammen – einer Bio-Manufaktur, die seit vielen Jahren für mediterrane Feinkost, frische Antipasti und hochwertige Delikatessen steht.",
  introSecond:
    "Die Produkte von ilcesto überzeugen durch frische Verarbeitung, hochwertige biologische Zutaten und echte Handwerkskunst. Viele Antipasti, Oliven, Artischocken, Peperoni, Pestos und Feinkost-Spezialitäten werden wöchentlich frisch hergestellt und direkt verarbeitet – inspiriert von mediterraner Genusskultur und traditionellen Rezepturen.",
  highlightsIntro:
    "Bei unserer Feinkost in Aalen legen wir besonderen Wert auf:",
  sectionTitle: "Mediterrane Feinkost mit Qualität und Herkunft",
  sectionText:
    "Die Philosophie von ilcesto passt perfekt zu Culina: ehrliche Lebensmittel, frische Verarbeitung, nachhaltiges Denken und echter Geschmack statt Massenproduktion. Verarbeitet werden ausschließlich hochwertige Rohstoffe und ausgewählte Zutaten – mit viel Erfahrung, Fingerspitzengefühl und Leidenschaft für gutes Essen.",
  quoteTitle:
    '"Für mich zählt nicht nur die Feinkost selbst – sondern die Qualität bis ins kleinste Detail."',
  quoteText:
    '"Ich arbeite mit ilcesto, weil man die Qualität einfach schmeckt. Nicht nur bei den Antipasti und Delikatessen selbst, sondern auch bei den Ölen, Gewürzen und Zutaten, mit denen alles eingelegt und veredelt wird. Genau diese Liebe zum Produkt möchte ich auch meinen Gästen in Aalen weitergeben."',
  quoteAuthor: "Fabry",
  transition:
    "Ob mediterrane Antipasti, besondere Delikatessen, hochwertige Öle, Essige oder kreative Feinkost-Geschenkideen – bei Culina findest du ausgewählte Produkte für echte Genussmomente zuhause.",
  usageIntro: "Unsere Feinkost-Produkte eignen sich perfekt:",
  outro:
    "Mit unserer Feinkost von ilcesto möchten wir Menschen für gute Lebensmittel, bewussten Genuss und mediterrane Küche begeistern.",
};

export const FEINKOST_HIGHLIGHTS: LocationFeature[] = [
  { title: "Mediterrane Spezialitäten" },
  { title: "Hochwertige Öle & Essige" },
  { title: "Frische Antipasti & Delikatessen" },
  { title: "Biologische Zutaten" },
  { title: "Traditionelle Herstellung" },
  { title: "Kreative Genussmomente für zuhause" },
];

export const FEINKOST_USAGE: LocationFeature[] = [
  { title: "Als Geschenkidee in Aalen" },
  { title: "Für Genießer & Feinschmecker" },
  { title: "Für besondere Abende zuhause" },
  { title: "Als Ergänzung zu Kochkursen & Events" },
  { title: "Für mediterranen Genuss im Alltag" },
];

export const UEBER_MICH_PAGE = {
  title: "Nenn mich einfach Fabry",
  metaTitle: "Über mich – Fabry",
  description:
    "Kochen bedeutet für mich Gemeinschaft, Genuss und Menschen zusammenzubringen.",
  subtitle:
    "Kochen bedeutet für mich Gemeinschaft, Genuss und Menschen zusammenzubringen",
  section1Label: "Meine Geschichte",
  section1Title: "Von Rumänien nach Aalen",
  section1Text1:
    'Mein Name ist Razvan George Pamfile, aber Freunde, Familie und viele Gäste nennen mich einfach "Fabry". Geboren und aufgewachsen bin ich in Rumänien – dort habe ich auch meine Leidenschaft fürs Kochen entdeckt und meine ersten Erfahrungen in der Küche gesammelt. Besonders die südliche und mediterrane Küche begeistert mich bis heute: frische Zutaten, ehrliche Gerichte und gemeinsames Genießen stehen für mich immer im Mittelpunkt.',
  section1Text2:
    "2017 kam ich nach Deutschland und habe meinen Weg in der Gastronomie Schritt für Schritt aufgebaut. Vom Tellerwäscher bis zum Koch durfte ich alle Stationen kennenlernen und wertvolle Erfahrungen sammeln. Gerade diese Zeit hat mich geprägt, denn ich habe gelernt, wie wichtig Teamgeist, Qualität und echte Gastfreundschaft sind.",
  section1Image: "/images/der-fabry.webp",
  section1ImageAlt: "Fabry – Gründer von Culina",
  section2Label: "Mein Weg",
  section2Title: "Erfahrung trifft Leidenschaft",
  section2Text1:
    'Auch in Aalen konnte ich viele Erfahrungen sammeln – unter anderem bei Leib&Seele, in der Wilhelmshöhe und der Bierhalle. Später führte mich mein Weg nach Karlsruhe – erst ins Sternerestaurant "fine dining", und dann zu ilcesto, wo ich mein Wissen rund um Feinkost, hochwertige Lebensmittel und moderne Genusskonzepte weiter vertiefen konnte.',
  section2Text2:
    "Heute lebe ich mit meiner Familie und meinen zwei Kindern in Aalen und freue mich, mit Culina einen Ort zu schaffen, an dem Menschen zusammenkommen, gemeinsam kochen und schöne Momente erleben können.",
  section2Text3:
    "Mir ist besonders wichtig, dass sich meine Gäste wohlfühlen, Spaß haben und neben gutem Essen auch neue Ideen mit nach Hause nehmen. Ob kleine Tipps aus der Gastronomie, neue Rezeptideen oder besondere Geschmackserlebnisse – ich möchte Menschen für gutes Essen begeistern und zeigen, wie viel Freude gemeinsames Kochen machen kann.",
  section2Image: "/images/der-fabry-2.webp",
  section2ImageAlt: "Fabry in der Küche bei Culina",
  quote:
    '"Culina soll ein Ort sein, an dem Genuss, Gemeinschaft und familiäre Atmosphäre im Mittelpunkt stehen."',
};

export const GUTSCHEINE_PAGE = {
  title: "Kochkurs Gutscheine – Genuss verschenken",
  description:
    "Die besondere Geschenkidee für Genießer, Freunde und gemeinsame Erlebnisse",
  subtitle:
    "Die besondere Geschenkidee für Genießer, Freunde und gemeinsame Erlebnisse",
  intro:
    "Du suchst nach einer besonderen Geschenkidee? Mit einem Gutschein für Culina verschenkst du gemeinsame Zeit, kulinarische Erlebnisse und unvergessliche Genussmomente. Verwendbar für Kochkurse in Aalen, Catering, kulinarisches Ereignisse oder Feinkostartikel – unsere Gutscheine sind das perfekte Geschenk für alle, die gutes Essen und besondere Erlebnisse lieben.",
  introSecond:
    "Egal ob Geburtstag, Weihnachten, Jubiläum oder einfach als kleine Aufmerksamkeit: Ein Culina Gutschein verbindet Genuss, Gemeinschaft und echte Erinnerungen.",
};
