import type { Metadata } from "next";
import { LegalPage } from "@/components/atoms/legal-page";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung des Kochateliers gemäß DSGVO.",
};

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung">
      <section>
        <h2>1. Verantwortlicher</h2>
        <p>
          Verantwortlich im Sinne der DSGVO ist:
          <br />
          Kochatelier Sandra Muster
          <br />
          Musterstraße 1, 65185 Wiesbaden
          <br />
          E-Mail: kontakt@kochatelier.de
          <br />
          Telefon: +49 123 456 789
        </p>
      </section>

      <section>
        <h2>2. Erhebung und Verarbeitung personenbezogener Daten</h2>
        <p>
          Personenbezogene Daten werden nur erhoben, soweit dies für die
          Erbringung unserer Leistungen notwendig ist oder Sie uns diese
          freiwillig mitteilen – z. B. bei einer Kursanfrage oder Buchung über
          unser Kontaktformular.
        </p>
        <p>Wir verarbeiten folgende Kategorien von Daten:</p>
        <ul>
          <li>Name und Kontaktdaten (E-Mail, Telefon)</li>
          <li>Buchungs- und Zahlungsdaten</li>
          <li>Kommunikationsdaten (Nachrichten über das Kontaktformular)</li>
        </ul>
      </section>

      <section>
        <h2>3. Zweck der Verarbeitung</h2>
        <p>
          Ihre Daten werden ausschließlich zur Bearbeitung von Anfragen,
          Buchungen und der Durchführung von Kochkursen und Events genutzt. Eine
          Weitergabe an Dritte erfolgt nicht, sofern wir nicht gesetzlich dazu
          verpflichtet sind.
        </p>
      </section>

      <section>
        <h2>4. Rechtsgrundlage</h2>
        <p>
          Die Verarbeitung Ihrer Daten erfolgt auf Basis von Art. 6 Abs. 1 lit.
          b DSGVO (Vertragserfüllung) sowie Art. 6 Abs. 1 lit. f DSGVO
          (berechtigtes Interesse) für allgemeine Anfragen.
        </p>
      </section>

      <section>
        <h2>5. Speicherdauer</h2>
        <p>
          Wir speichern Ihre personenbezogenen Daten nur so lange, wie es für
          die genannten Zwecke erforderlich ist oder gesetzliche
          Aufbewahrungsfristen dies verlangen (in der Regel bis zu 10 Jahre für
          steuerrelevante Unterlagen).
        </p>
      </section>

      <section>
        <h2>6. Cookies und Analyse</h2>
        <p>
          Diese Website verwendet ausschließlich technisch notwendige Cookies.
          Es werden keine Tracking- oder Analyse-Cookies eingesetzt. Eine
          Einwilligung ist daher nicht erforderlich.
        </p>
      </section>

      <section>
        <h2>7. Ihre Rechte</h2>
        <p>Sie haben jederzeit das Recht auf:</p>
        <ul>
          <li>
            Auskunft über Ihre bei uns gespeicherten Daten (Art. 15 DSGVO)
          </li>
          <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
          <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
        </ul>
        <p>
          Zur Ausübung Ihrer Rechte wenden Sie sich bitte per E-Mail an
          kontakt@kochatelier.de. Sie haben zudem das Recht, sich bei der
          zuständigen Datenschutzaufsichtsbehörde zu beschweren.
        </p>
      </section>

      <section>
        <h2>8. Aktualität dieser Erklärung</h2>
        <p>
          Diese Datenschutzerklärung ist aktuell gültig und hat den Stand Mai
          2026. Durch die Weiterentwicklung unserer Website können Anpassungen
          erforderlich werden.
        </p>
      </section>
    </LegalPage>
  );
}
