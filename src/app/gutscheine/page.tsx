import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gutscheine",
  description:
    "Verschenke ein kulinarisches Erlebnis – Gutscheine für alle Kochkurse.",
};

export default function GutscheinePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Gutscheine</h1>
      <p className="mt-4 text-gray-600">
        Placeholder – Gutschein-Shop. Hier entstehen: ProductInfo,
        PurchaseWidget (digital oder gedruckt).
      </p>
      <p className="mt-4">
        Ob Geburtstag, Jubiläum oder einfach nur so – ein Gutschein für unsere
        Kochkurse ist das ideale Geschenk. Gültig 3 Jahre ab Kaufdatum.
      </p>
    </div>
  );
}
