import type { Metadata } from "next";
import { LegalPage } from "@/components/atoms/legal-page";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum von Culina gemäß § 5 TMG.",
};

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <section>
        <h2>Angaben gemäß § 5 TMG</h2>
        <p>
          Razvan George Pamfile
          <br />
          Kochkurse &amp; Feinkost
          <br />
          Bahnhofstraße 38
          <br />
          73430 Aalen
        </p>
      </section>

      <section>
        <h2>Kontakt</h2>
        <p>
          Telefon: <a href="tel:+491604031569">+49 (0) 1604031569</a>
          <br />
          E-Mail:{" "}
          <a href="mailto:fabry@culina-aalen.de">fabry@culina-aalen.de</a>
        </p>
      </section>

      <section>
        <h2>Umsatzsteuer-ID</h2>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE
          463771474
        </p>
      </section>

      <section>
        <h2>Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
          vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </section>
    </LegalPage>
  );
}
