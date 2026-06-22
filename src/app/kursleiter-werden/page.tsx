import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowUpRight,
  ChefHat,
  Clock3,
  Handshake,
  NotebookPen,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CtaButton } from "@/components/atoms/cta-button";
import { PLACEHOLDER_BENEFITS } from "@/lib/data";
import { CONTACT_INFO } from "@/lib/constants";
import { BenefitsGrid } from "@/components/organisms/benefits-grid";
import { ContactForm } from "@/components/organisms/contact-form";
import { APPLICATION_FORM } from "@/lib/form-configs";

const HERO_FEATURES = [
  { icon: ChefHat, label: "Eigene Konzepte & Pop-Ups" },
  { icon: Sparkles, label: "Premium-Equipment & Mise en Place" },
  { icon: Clock3, label: "Flexible Slots – auch abends" },
];

const HERO_METRICS = [
  { value: "25+", label: "Kurse pro Jahr" },
  { value: "4,9★", label: "Feedback von Gästen" },
];

const PROCESS_STEPS = [
  {
    icon: NotebookPen,
    title: "Vorstellen & inspirieren",
    description:
      "Schick uns deine Idee oder ein bestehendes Konzept – gern auch mit Fotos oder Social Links.",
  },
  {
    icon: ChefHat,
    title: "Format gemeinsam schärfen",
    description:
      "Wir planen Menü, Ablauf und Team. Falls nötig, unterstützen wir bei Einkauf, Mise en Place und Kalkulation.",
  },
  {
    icon: Handshake,
    title: "Live im Kochatelier",
    description:
      "Du leitest den Kurs, wir kümmern uns um Location, Gäste-Betreuung und Marketing – und feiern danach gemeinsam.",
  },
];

const PRE_FORM_POINTS = [
  "Antwort innerhalb von 48 Stunden – meistens schneller.",
  "Honorar, Zutaten und Teilnehmerzahl legen wir gemeinsam transparent fest.",
  "Auch einmalige Pop-Ups oder Gastro-Residencies sind willkommen.",
];

export const metadata: Metadata = {
  title: "Werde Kursleiter",
  description:
    "Teile deine Leidenschaft – werde Gastgeber in unserem Kochatelier.",
};

export default function KursleiterWerdenPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="bg-deep-black relative overflow-hidden rounded-[36px] px-6 py-16 shadow-[0_28px_90px_-40px_rgba(0,0,0,0.9)] sm:px-10 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-14">
        <div
          className="absolute inset-0 bg-[radial-gradient(60%_85%_at_0%_0%,rgba(255,224,170,0.08),transparent)]"
          aria-hidden
        />
        <div className="relative z-10">
          <Badge variant="brand" className="mb-6">
            Werde Kursleiter
          </Badge>
          <h1 className="font-heading text-pure-white text-4xl leading-tight tracking-tight sm:text-5xl">
            Teile deine Leidenschaft – werde Gastgeber in unserem Kochatelier.
          </h1>
          <p className="text-pure-white/80 mt-5 max-w-2xl text-lg leading-relaxed">
            Entwickle Kochkurse, Tastings oder Pop-Ups im Culina Studio. Wir
            liefern Bühne, Technik und Community – du bringst deine Handschrift
            und Geschichten mit.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {HERO_FEATURES.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="text-pure-white/80 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm"
              >
                <Icon className="size-4" aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <CtaButton
              href="#bewerbung"
              label="Jetzt bewerben"
              variant="brandSecondary"
              className="rounded-full px-6"
            />
            <Link
              href="#prozess"
              className="text-pasta-gelb inline-flex items-center gap-2 text-sm font-semibold tracking-wide"
            >
              Ablauf ansehen
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-8">
            {HERO_METRICS.map((metric) => (
              <div key={metric.label} className="text-pure-white/80">
                <p className="font-heading text-pure-white text-3xl">
                  {metric.value}
                </p>
                <p className="text-sm tracking-[0.35em] uppercase">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative mt-12 min-h-[360px] overflow-hidden rounded-[28px] border border-white/10 lg:mt-0">
          <Image
            src="/images/kochkurs-gericht-3.webp"
            alt="Kursleiter kochen gemeinsam im Culina Studio"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, (max-width: 1536px) 45vw, 560px"
            quality={60}
            loading="lazy"
            decoding="async"
          />
          <div
            className="from-deep-black/80 absolute inset-0 bg-linear-to-t to-transparent"
            aria-hidden
          />
          <div className="text-pure-white absolute right-6 bottom-6 left-6 rounded-2xl bg-white/5 p-4 backdrop-blur">
            <p className="text-pure-white/70 text-sm tracking-[0.35em] uppercase">
              Studio Facts
            </p>
            <p className="font-heading text-2xl">80 m² Bühne für Geschmack</p>
            <p className="text-pure-white/70 text-sm">
              Alle NEFF-Geräte, Mise en Place Support und ein herzliches Team
              warten schon auf dich.
            </p>
          </div>
        </div>
      </section>

      <BenefitsGrid benefits={PLACEHOLDER_BENEFITS} />

      <section
        id="prozess"
        className="mt-24 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]"
      >
        <div className="bg-deep-black text-pure-white relative overflow-hidden rounded-3xl p-8 sm:p-10">
          <Image
            src="/images/der-fabry.webp"
            alt="Fabry – Gastgeber bei Culina"
            fill
            className="object-cover opacity-40"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 45vw, 420px"
            quality={60}
            loading="lazy"
            decoding="async"
          />
          <div
            className="from-deep-black/80 to-deep-black/60 absolute inset-0 bg-linear-to-br"
            aria-hidden
          />
          <div className="relative z-10 space-y-6">
            <h2 className="font-heading text-3xl leading-tight tracking-tight">
              "Wir suchen Menschen, die Geschichten erzählen – nicht nur Rezepte
              runterkochen."
            </h2>
            <p className="text-pure-white/75 text-base">
              Fabry, Gastgeber und Gründer von Culina
            </p>
            <p className="text-pure-white/70 text-sm leading-relaxed">
              Egal ob du aus der Gastronomie kommst oder leidenschaftliche*r
              Hobbykoch*köchin bist – wichtig sind Persönlichkeit, ein klares
              Konzept und Lust auf echte Begegnungen.
            </p>
          </div>
        </div>
        <div className="border-border/60 bg-pure-white rounded-3xl border p-6 sm:p-8">
          <div className="mb-8">
            <p className="text-foreground/60 text-sm tracking-[0.35em] uppercase">
              So läuft's
            </p>
            <h2 className="text-3xl font-semibold tracking-tight">
              Vom ersten Ping zum vollen Kurs
            </h2>
          </div>
          <div className="space-y-5">
            {PROCESS_STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="border-border/60 hover:border-deep-black flex gap-4 rounded-2xl border p-4 transition"
                >
                  <span className="bg-deep-black text-pure-white font-heading flex size-12 items-center justify-center rounded-2xl text-lg">
                    {index + 1}
                  </span>
                  <div>
                    <div className="text-foreground/60 mb-1 flex items-center gap-2 text-sm font-semibold tracking-[0.35em] uppercase">
                      <Icon className="size-4" aria-hidden="true" />
                      Step
                    </div>
                    <p className="text-lg leading-tight font-semibold">
                      {step.title}
                    </p>
                    <p className="text-foreground/70 mt-1 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mt-20 grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="border-border/50 bg-pure-white rounded-3xl border p-6 sm:p-8">
          <p className="text-foreground/60 text-sm tracking-[0.35em] uppercase">
            Vorbereitung
          </p>
          <h3 className="text-2xl font-semibold tracking-tight">
            Was wir vorab brauchen
          </h3>
          <ul className="text-foreground/80 mt-6 space-y-4 text-sm leading-relaxed">
            {PRE_FORM_POINTS.map((point) => (
              <li key={point} className="flex gap-3">
                <Sparkles
                  className="text-deep-black mt-0.5 size-4"
                  aria-hidden="true"
                />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="border-border/50 bg-pure-white rounded-3xl border p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full">
              <Image
                src="/images/der-fabry-2.webp"
                alt="Fabry"
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div>
              <p className="text-foreground/60 text-sm tracking-[0.35em] uppercase">
                Dein Ansprechpartner
              </p>
              <p className="text-xl leading-tight font-semibold">
                Fabry Pamfile
              </p>
              <p className="text-foreground/70 text-sm">
                Koordination & Booking
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="border-border/50 rounded-2xl border p-4">
              <p className="text-foreground/60 text-xs tracking-[0.35em] uppercase">
                Mail
              </p>
              <Link
                href={`mailto:${CONTACT_INFO.email}`}
                className="text-lg font-semibold"
              >
                {CONTACT_INFO.email}
              </Link>
            </div>
            <div className="border-border/50 rounded-2xl border p-4">
              <p className="text-foreground/60 text-xs tracking-[0.35em] uppercase">
                Telefon
              </p>
              <Link
                href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                className="text-lg font-semibold"
              >
                {CONTACT_INFO.phone}
              </Link>
            </div>
          </div>
          <p className="text-foreground/70 mt-6 text-sm leading-relaxed">
            Lieber persönlich? Komm auf einen Espresso vorbei und wir planen
            dein Format im Studio.
          </p>
        </div>
      </section>

      <ContactForm id="bewerbung" config={APPLICATION_FORM} className="px-0" />
    </main>
  );
}
