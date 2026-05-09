import type { Metadata } from "next";
import { VoucherOptions } from "@/components/organisms/voucher-options";
import { VoucherForm } from "@/components/organisms/voucher-form";

export const metadata: Metadata = {
  title: "Gutscheine",
  description:
    "Verschenke ein kulinarisches Erlebnis – Gutscheine für alle Kochkurse im Kochatelier.",
};

export default function GutscheinePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-4">
        <h1 className="text-4xl font-bold tracking-tight">Gutscheine</h1>
        <p className="text-foreground/60 mt-3 text-lg">
          Ob Geburtstag, Jubiläum oder einfach nur so – ein Kochkurs-Gutschein
          ist das ideale Geschenk. Gültig 3 Jahre ab Kaufdatum.
        </p>
      </div>
      <VoucherOptions />
      <VoucherForm />
    </main>
  );
}
