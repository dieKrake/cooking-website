import { Gift } from "lucide-react";
import { SectionHeading } from "@/components/atoms/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VoucherOption {
  amount: number;
  description: string;
}

const OPTIONS: VoucherOption[] = [
  {
    amount: 50,
    description: "Ideal als kleines Dankeschön oder Geburtstagsgeschenk",
  },
  {
    amount: 100,
    description: "Die perfekte Aufmerksamkeit für ein Firmenjubiläum",
  },
  {
    amount: 150,
    description: "Verschenke ein unvergessliches gemeinsames Erlebnis",
  },
];

export function VoucherOptions() {
  return (
    <section className="py-12">
      <SectionHeading title="Erhältliche Gutscheine" />
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {OPTIONS.map((option) => (
          <Card key={option.amount} className="text-left lg:text-center">
            <CardHeader className="items-center pb-2">
              <Gift className="text-eisblau h-8 w-8" aria-hidden="true" />
              <CardTitle className="text-3xl font-bold">
                {option.amount} €
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/70 text-sm">
              {option.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
