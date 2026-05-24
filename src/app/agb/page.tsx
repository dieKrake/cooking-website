import type { Metadata } from "next";
import { LegalPage } from "@/components/atoms/legal-page";

export const metadata: Metadata = {
  title: "AGB",
  description: "Allgemeine Geschäftsbedingungen von Culina.",
};

export default function AgbPage() {
  return (
    <LegalPage title="Allgemeine Geschäftsbedingungen">
      <section>
        <h2>§ 1 Geltungsbereich</h2>
        <p>
          Diese Allgemeinen Geschäftsbedingungen gelten für alle Buchungen und
          Verträge zwischen Culina (Sandra Muster, Musterstraße 1, 65185
          Wiesbaden) und den Teilnehmenden der angebotenen Kochkurse,
          Veranstaltungen und sonstigen Leistungen.
        </p>
      </section>

      <section>
        <h2>§ 2 Vertragsschluss</h2>
        <p>
          Eine Buchung kommt zustande, sobald Culina die Anmeldung schriftlich
          per E-Mail bestätigt. Ein Anspruch auf Teilnahme besteht erst nach
          Eingang der vollständigen Zahlung.
        </p>
      </section>

      <section>
        <h2>§ 3 Preise und Zahlung</h2>
        <p>
          Alle angegebenen Preise sind Endpreise inklusive der gesetzlichen
          Mehrwertsteuer. Die Zahlung erfolgt per Überweisung auf das angegebene
          Konto. Der Rechnungsbetrag ist innerhalb von 7 Tagen nach
          Buchungsbestätigung fällig.
        </p>
      </section>

      <section>
        <h2>§ 4 Stornierung und Rücktritt</h2>
        <p>
          Stornierungen sind bis 14 Tage vor Kursbeginn kostenfrei möglich. Bei
          späteren Absagen werden folgende Gebühren erhoben:
        </p>
        <ul>
          <li>Bis 7 Tage vor Kursbeginn: 50 % des Kurspreises</li>
          <li>Weniger als 7 Tage vor Kursbeginn: 100 % des Kurspreises</li>
        </ul>
        <p>
          Die Übertragung des Platzes auf eine andere Person ist nach vorheriger
          Absprache jederzeit möglich.
        </p>
      </section>

      <section>
        <h2>§ 5 Absage durch Culina</h2>
        <p>
          Culina behält sich vor, Kurse bei nicht ausreichender Teilnehmerzahl
          oder aus wichtigem Grund abzusagen. In diesem Fall werden bereits
          gezahlte Beträge vollständig erstattet. Weitergehende Ansprüche sind
          ausgeschlossen.
        </p>
      </section>

      <section>
        <h2>§ 6 Haftung</h2>
        <p>
          Die Teilnahme an Kochkursen erfolgt auf eigene Verantwortung. Culina
          haftet nicht für Schäden, die durch unsachgemäße Nutzung von Geräten
          oder Zutaten entstehen, sofern kein vorsätzliches oder grob
          fahrlässiges Handeln vorliegt.
        </p>
      </section>

      <section>
        <h2>§ 7 Gutscheine</h2>
        <p>
          Gutscheine sind ab Kaufdatum 3 Jahre gültig und können für alle
          buchbaren Kochkurse eingelöst werden. Eine Barauszahlung ist nicht
          möglich. Gutscheine sind nicht übertragbar.
        </p>
      </section>

      <section>
        <h2>§ 8 Schlussbestimmungen</h2>
        <p>
          Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist
          Wiesbaden, sofern gesetzlich zulässig. Sollten einzelne Bestimmungen
          dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen
          Bestimmungen unberührt.
        </p>
      </section>
    </LegalPage>
  );
}
