import type { Metadata } from "next";
import { VoucherOptions } from "@/components/organisms/voucher-options";
import { VoucherIdeas } from "@/components/organisms/voucher-ideas";
import { VoucherForm } from "@/components/organisms/voucher-form";

export const metadata: Metadata = {
  title: "Kochkurs Gutscheine – Genuss verschenken",
  description:
    "Die besondere Geschenkidee für Genießer, Freunde und gemeinsame Erlebnisse",
};

export default function GutscheinePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Kochkurs Gutscheine – Genuss verschenken
        </h1>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">
          Die besondere Geschenkidee für Genießer, Freunde und gemeinsame
          Erlebnisse
        </h2>
        <p className="text-foreground/60 mt-3 text-lg">
          Du suchst nach einer besonderen Geschenkidee? Mit einem Gutschein für
          Culina verschenkst du gemeinsame Zeit, kulinarische Erlebnisse und
          unvergessliche Genussmomente. Verwendbar für Kochkurse in Aalen,
          Catering, kulinarisches Ereignisse oder Feinkostartikel – unsere
          Gutscheine sind das perfekte Geschenk für alle, die gutes Essen und
          besondere Erlebnisse lieben.
        </p>
        <p className="text-foreground/60 mt-3 text-lg">
          Egal ob Geburtstag, Weihnachten, Jubiläum oder einfach als kleine
          Aufmerksamkeit: Ein Culina Gutschein verbindet Genuss, Gemeinschaft
          und echte Erinnerungen.
        </p>
      </div>
      <VoucherOptions />
      <VoucherIdeas />
      <VoucherForm />
    </main>
  );
}
