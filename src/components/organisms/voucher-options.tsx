import { Gift } from "lucide-react";
import { SectionHeading } from "@/components/atoms/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VoucherOption {
  amount: number;
  description: string;
}

const OPTIONS: VoucherOption[] = [
  { amount: 50, description: "Ideal als kleines Dankeschön oder Geburtstagsgeschenk." },
  { amount: 75, description: "Perfekt für einen halben Kursabend mit Freunden." },
  { amount: 100, description: "Der Klassiker – für einen vollständigen Kochkurs." },
  { amount: 150, description: "Das Premium-Erlebnis für besondere Anlässe." },
];

export function VoucherOptions() {
  return (
    <section className="py-12">
      <SectionHeading
        title="Unsere Gutscheine"
        subtitle="Gültig 3 Jahre ab Kaufdatum – für alle Kochkurse im Kochatelier."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {OPTIONS.map((option) => (
          <Card key={option.amount} className="text-center">
            <CardHeader className="items-center pb-2">
              <Gift className="h-8 w-8 text-primary" aria-hidden="true" />
              <CardTitle className="text-3xl font-bold">{option.amount} €</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-foreground/70">
              {option.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
