# Projekt-Dokumentation – Kochatelier Web-Projekt

> **Version:** 1.0  
> **Erstellt:** 29. April 2026  
> **Status:** Phase 2 – Dokumentation  
> **Referenz:** [analyse.md](./analyse.md)

---

## 2.1 Projektübersicht

| Feld                 | Wert                                                                                                                                                                                                |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Projektname**      | Kochatelier (Arbeitstitel – wird angepasst)                                                                                                                                                         |
| **Kurzbeschreibung** | Website für ein Kochatelier, das kreative Kochkurse, Eventlocation-Vermietung und Catering anbietet. Ziel: Kursbuchung, Event-Anfragen und Gutscheinverkauf über eine moderne, performante Website. |
| **Zielgruppe**       | Kochbegeisterte (25–55 J.), Unternehmen (Teamevents), Privatpersonen (Feiern), Hobby- und Profiköche (als Kursleiter), Foodies & Gesundheitsbewusste                                                |
| **Standort**         | Lokal (Stadt/Region – wird angepasst)                                                                                                                                                               |
| **Sprache**          | Deutsch (de-DE)                                                                                                                                                                                     |
| **Tech-Stack**       | Next.js, Tailwind CSS, TypeScript                                                                                                                                                                   |

---

## 2.2 Tech-Stack

| Bereich            | Technologie                    | Version              |
| ------------------ | ------------------------------ | -------------------- |
| **Framework**      | Next.js (App Router)           | latest stable (15.x) |
| **Styling**        | Tailwind CSS                   | 4.x                  |
| **Sprache**        | TypeScript                     | 5.x                  |
| **UI-Komponenten** | shadcn/ui                      | latest               |
| **Icons**          | Lucide React                   | latest               |
| **Testing (Unit)** | Vitest + React Testing Library | latest               |
| **Testing (E2E)**  | Playwright                     | latest               |
| **Linting**        | ESLint + Prettier              | latest               |
| **Formatierung**   | Prettier + Tailwind Plugin     | latest               |
| **VCS**            | Git + GitHub                   | –                    |
| **CI/CD**          | GitHub Actions                 | –                    |
| **Hosting**        | Vercel (empfohlen)             | Free Tier / Pro      |
| **Paketmanager**   | npm                            | latest               |

---

## 2.3 Design-Prinzipien

### Mobile-First

Alle Komponenten werden zuerst für mobile Viewports entwickelt, dann progressiv für Tablet und Desktop erweitert.

### Responsive Breakpoints (Tailwind-Defaults)

| Token | Breite | Zielgerät                            |
| ----- | ------ | ------------------------------------ |
| `sm`  | 640px  | Große Smartphones                    |
| `md`  | 768px  | Tablets (Portrait)                   |
| `lg`  | 1024px | Tablets (Landscape) / kleine Laptops |
| `xl`  | 1280px | Desktop                              |
| `2xl` | 1536px | Große Displays                       |

### Weitere Prinzipien

- **Semantisches HTML** – korrekte Heading-Hierarchie (H1 → H2 → H3), Landmark-Elemente (`<nav>`, `<main>`, `<section>`, `<footer>`)
- **Accessibility** – WCAG 2.1 AA: Kontrastverhältnisse ≥ 4.5:1, Keyboard-Navigation, ARIA-Labels, Fokus-Management
- **Performance** – Lighthouse Score ≥ 90 auf allen Seiten; Next.js Image-Optimierung, Font-Subsetting
- **SEO** – Individuelle Meta-Tags pro Seite, strukturierte Daten (JSON-LD), saubere URL-Slugs, automatische Sitemap

---

## 2.4 Seitenstruktur & Routing

### App Router Verzeichnis (`/app`)

```
app/
├── layout.tsx                  # Root-Layout (Navbar + Footer)
├── page.tsx                    # Startseite
├── aktuelle-kurse/
│   └── page.tsx                # Kurs-Listing
├── kurse/
│   └── [slug]/
│       └── page.tsx            # Kurs-Detailseite
├── eventlocation/
│   └── page.tsx                # Eventlocation
├── catering/
│   └── page.tsx                # Catering
├── team/
│   └── page.tsx                # Unser Team
├── kursleiter-werden/
│   └── page.tsx                # Werde Kursleiter
├── gutscheine/
│   └── page.tsx                # Gutschein-Shop
├── ueber-uns/
│   └── page.tsx                # Über mich / Über uns
├── kontakt/
│   └── page.tsx                # Kontakt (eigenständige Seite)
├── agb/
│   └── page.tsx                # AGB
├── impressum/
│   └── page.tsx                # Impressum
└── datenschutz/
    └── page.tsx                # Datenschutzerklärung
```

### Routen-Übersicht

| Route                | Seite             | Hauptkomponenten                                                             | Dummy-Content                                               |
| -------------------- | ----------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `/`                  | Startseite        | Hero, OfferCards, CourseSlider, Calendar, EventTeaser, Partners, ContactForm | Willkommen-Text, 3 Angebots-Beschreibungen, 5 Beispielkurse |
| `/aktuelle-kurse`    | Kurs-Listing      | CourseList, CourseCard                                                       | 10–15 Beispielkurse mit Datum, Titel, Beschreibung          |
| `/kurse/[slug]`      | Kurs-Detail       | CourseDetail, TicketButton, ShareLinks                                       | 1 Beispielkurs vollständig ausgebaut                        |
| `/eventlocation`     | Eventlocation     | HeroSection, FeatureList, Gallery, InquiryForm                               | Location-Features, 4 Anlässe, Preisspanne                   |
| `/catering`          | Catering          | HeroSection, CateringForm                                                    | Beschreibung, Anfrage-Formular                              |
| `/team`              | Team              | TeamGrid, TeamCard                                                           | 5 Beispiel-Kursleiter mit Name, Bio, Bild-Platzhalter       |
| `/kursleiter-werden` | Kursleiter werden | HeroSection, BenefitsList, ApplicationForm                                   | 5 Benefits, Bewerbungsformular                              |
| `/gutscheine`        | Gutscheine        | ProductInfo, PurchaseWidget                                                  | Gutschein-Beschreibung, Kaufoptionen                        |
| `/ueber-uns`         | Über uns          | StorySection                                                                 | Gründer-Story (Platzhalter)                                 |
| `/kontakt`           | Kontakt           | ContactForm, ContactInfo, Map                                                | Adresse, Telefon, E-Mail, Karte                             |
| `/agb`               | AGB               | LegalContent                                                                 | Platzhalter-AGB                                             |
| `/impressum`         | Impressum         | LegalContent                                                                 | Platzhalter-Impressum                                       |
| `/datenschutz`       | Datenschutz       | LegalContent                                                                 | Platzhalter-DSGVO                                           |

---

## 2.5 Komponentenarchitektur

### Atomic Design Struktur

```
components/
├── ui/                         # Atoms (shadcn/ui + eigene)
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── textarea.tsx
│   ├── badge.tsx
│   ├── separator.tsx
│   ├── sheet.tsx               # Mobile-Drawer
│   ├── dialog.tsx
│   ├── carousel.tsx
│   └── skeleton.tsx
│
├── atoms/                      # Eigene Atoms
│   ├── logo.tsx
│   ├── section-heading.tsx
│   ├── cta-button.tsx
│   └── social-link.tsx
│
├── molecules/                  # Zusammengesetzte Elemente
│   ├── course-card.tsx
│   ├── team-card.tsx
│   ├── offer-card.tsx
│   ├── benefit-item.tsx
│   ├── partner-logo.tsx
│   ├── nav-link.tsx
│   └── nav-dropdown.tsx
│
├── organisms/                  # Komplexe Bereiche
│   ├── navbar.tsx
│   ├── mobile-nav.tsx
│   ├── footer.tsx
│   ├── hero-section.tsx
│   ├── offer-grid.tsx
│   ├── course-slider.tsx
│   ├── course-list.tsx
│   ├── team-grid.tsx
│   ├── benefits-list.tsx
│   ├── partner-carousel.tsx
│   ├── contact-form.tsx
│   ├── inquiry-form.tsx
│   ├── application-form.tsx
│   ├── catering-form.tsx
│   ├── event-teaser.tsx
│   ├── gallery.tsx
│   └── feature-list.tsx
│
└── templates/                  # Seitenlayouts
    ├── legal-page-template.tsx
    └── detail-page-template.tsx
```

### Vollständige Verzeichnisstruktur

```
src/
├── app/                        # Next.js App Router (siehe 2.4)
├── components/                 # Komponentenbibliothek (siehe oben)
├── lib/
│   ├── utils.ts                # Utility-Funktionen (cn, formatDate, etc.)
│   ├── placeholder-data.ts     # Alle Dummy-Inhalte als Konstanten
│   └── constants.ts            # Globale Konstanten (Nav-Links, Kontaktdaten, etc.)
├── types/
│   └── index.ts                # TypeScript Interfaces & Types
├── hooks/
│   └── use-media-query.ts      # Custom Hooks
├── styles/
│   └── globals.css             # Tailwind Directives + globale Custom-Styles
└── public/
    ├── images/
    │   └── placeholder/        # Platzhalter-Bilder
    ├── fonts/                  # Lokale Fonts (falls nötig)
    └── favicon.ico
```

---

## 2.6 KI-Arbeitsanweisungen

> Dieser Abschnitt dient als **Leitfaden für KI-Assistenten**, die am Projekt mitarbeiten.

### Dateikonventionen

- Jede Komponente erhält eine eigene Datei
- **Naming:** PascalCase für Komponenten (`CourseCard`), kebab-case für Dateien/Ordner (`course-card.tsx`)
- **Exports:** Named Exports bevorzugt, Default Exports nur für Page-Komponenten

### Styling

- Tailwind-Klassen direkt im JSX, **keine separaten CSS-Dateien** (außer `globals.css`)
- **Keine Inline-Styles**, kein `!important`
- Responsive-Klassen immer Mobile-First: `className="text-sm md:text-base lg:text-lg"`
- `cn()` Utility (aus `lib/utils.ts`) für bedingte Klassen

### Inhalte

- Dummy-Inhalte als Konstanten in `/lib/placeholder-data.ts`
- Keine Hardcoded-Strings in Komponenten – alles über Props oder Placeholder-Data

### Bilder

- Next.js `<Image>` Komponente mit expliziten `width` und `height`
- Platzhalter-Bilder über `/public/images/placeholder/` oder `placeholder.com`-URLs

### Tests

- Jede neue Seite/Komponente erhält mindestens einen Unit-Test
- Testdateien neben der Komponente: `course-card.test.tsx` neben `course-card.tsx`

### Commits

- **Conventional Commits:** `feat:`, `fix:`, `docs:`, `chore:`, `style:`, `test:`, `refactor:`
- Beispiel: `feat: add course-card component with responsive layout`

### Code-Qualität

- Keine `any`-Types – immer explizite Typisierung
- Props als Interface definiert, Prefix: `[KomponentenName]Props`
- Keine verschachtelten Ternaries – Readability > Cleverness

---

## 2.7 Testing-Strategie

### Pyramide

```
         ┌─────────┐
         │  E2E    │  Playwright (5–10 Tests)
         │ Tests   │  Kritische User-Journeys
        ┌┴─────────┴┐
        │Integration │  Vitest + RTL (pro Seite)
        │   Tests    │  Seitenlevel-Rendering
       ┌┴────────────┴┐
       │  Unit Tests   │  Vitest + RTL (pro Komponente)
       │               │  Alle UI-Komponenten, Utilities
       └───────────────┘
```

### Unit-Tests (Vitest + React Testing Library)

- Jede UI-Komponente: Rendering, Props, Zustände
- Utility-Funktionen: `formatDate()`, `cn()`, etc.
- Datei-Konvention: `*.test.tsx` / `*.test.ts`

### Integration-Tests (Vitest + RTL)

- Seitenlevel-Rendering: Prüfe, ob Seite korrekt rendert
- Formular-Flows: Ausfüllen → Validierung → Submit
- Navigation: Links führen zu korrekten Routen

### E2E-Tests (Playwright)

- **Navigation:** Startseite → Kurs-Listing → Kurs-Detail
- **Kurs-Buchung:** Kurs auswählen → Ticket kaufen (Mock)
- **Formulare:** Kontakt-Formular ausfüllen → Absenden → Bestätigung
- **Mobile:** Burger-Menü öffnen → navigieren → schließen
- **Responsive:** Seite auf verschiedenen Viewports prüfen

### Coverage-Ziel

- **Gesamt:** ≥ 80%
- **Komponenten:** ≥ 90%
- **Utilities:** 100%

---

## 2.8 CI/CD-Pipeline

### Branch-Strategie

```
main (Production) ← PR + Review + Tests grün
  ↑
develop (Staging) ← PR + Tests grün
  ↑
feature/* / fix/* (Branches)
```

### GitHub Actions Workflows

#### `ci.yml` – Auf jedem PR

```yaml
name: CI
on:
  pull_request:
    branches: [develop, main]

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run test:coverage
      - run: npm run build
```

#### `deploy-dev.yml` – Push auf `develop`

```yaml
name: Deploy Dev
on:
  push:
    branches: [develop]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run test:coverage
      - run: npm run build
      # Vercel Preview Deployment (automatisch via GitHub-Integration)
      # Alternativ: manueller Deploy via Vercel CLI
```

#### `deploy-prod.yml` – Release-Tag

```yaml
name: Deploy Production
on:
  push:
    tags:
      - "v*.*.*"

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run test:coverage
      - run: npm run build
      # Vercel Production Deployment
```

### Environment-Variablen

| Variable                    | Umgebung     | Beschreibung                                                          |
| --------------------------- | ------------ | --------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`      | Dev / Prod   | Basis-URL der Website                                                 |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Dev / Prod   | Kontakt-E-Mail                                                        |
| `VERCEL_TOKEN`              | CI/CD Secret | Vercel Deploy-Token                                                   |
| `ADMIN_PASSWORD`            | Dev / Prod   | Passwort für den Admin-Bereich unter `/admin/event`                   |
| `GITHUB_PAT`                | Dev / Prod   | GitHub Personal Access Token mit Schreibrechten (Contents Read/Write) |
| `GITHUB_REPO`               | Dev / Prod   | GitHub Repository Name im Format `username/repo-name`                 |
| `GITHUB_BRANCH`             | Dev / Prod   | Ziel-Branch für Commits (z.B. `develop` oder `main`)                  |

---

## 2.9 Git-Branching-Strategie

### Branches

| Branch           | Zweck                 | Deployment                |
| ---------------- | --------------------- | ------------------------- |
| `main`           | Production-ready Code | → Vercel Production       |
| `develop`        | Integrationsbranch    | → Vercel Preview          |
| `feature/<name>` | Neue Features         | → Vercel Preview (per PR) |
| `fix/<name>`     | Bugfixes              | → Vercel Preview (per PR) |

### Workflow

1. Neues Feature: `git checkout -b feature/course-slider develop`
2. Entwicklung + Commits (Conventional Commits)
3. Push + PR gegen `develop`
4. CI läuft (Lint → Test → Build)
5. Code-Review → Merge
6. `develop` deployed automatisch als Preview
7. Release: PR von `develop` → `main`, Tag `v1.0.0`
8. Production-Deployment

### Releases

- Über **GitHub Releases** + semantische Tags (`v1.0.0`, `v1.1.0`, `v1.1.1`)
- Changelog automatisch aus Conventional Commits generierbar

---

## 2.10 Hosting-Empfehlung

### Vergleich

| Anbieter             | Dev-Server                        | Prod-Server                     | Kosten (geschätzt)       | Next.js Support                    |
| -------------------- | --------------------------------- | ------------------------------- | ------------------------ | ---------------------------------- |
| **Vercel**           | Preview Deployments (auto per PR) | Production (auto bei Tag/Merge) | Free Tier / ~$20/mo Pro  | ✅ Nativ, erstklassig              |
| **Cloudflare Pages** | Preview Branches                  | Production                      | Free Tier (großzügig)    | ⚠️ Via `@cloudflare/next-on-pages` |
| **AWS Amplify**      | Branch-Deployments                | Production                      | ~$0–5/mo (wenig Traffic) | ✅ Gut                             |
| **Hetzner + Docker** | Eigener VPS                       | Eigener VPS                     | ~€4–8/mo                 | ✅ Volle Kontrolle, mehr Setup     |
| **Railway**          | Environments                      | Production                      | ~$5/mo                   | ✅ Gut                             |

### Empfehlung

> **Für den Start: Vercel (Free Tier)**
>
> - Zero-Config für Next.js
> - Automatische Preview-Deployments pro Branch = Dev-Server out-of-the-box
> - Globales CDN, Edge Functions, Analytics inklusive
> - Wechsel zu AWS/Hetzner erst bei Skalierungsbedarf
>
> **Budget-Option mit voller Kontrolle: Hetzner Cloud**
>
> - ~€4/mo (CX22) mit Docker + Traefik
> - Manuelleres Setup, aber langfristig am günstigsten
> - Empfohlen erst ab Phase 2 (nach MVP-Launch)

---

## Nächste Schritte

- [ ] **Phase 3:** Projekt-Setup (Next.js + Tailwind + Verzeichnisstruktur)
- [ ] **Phase 4:** CI/CD Setup (GitHub Actions + Vercel)
- [ ] **Phase 5:** Komponenten-Entwicklung (iterativ)
