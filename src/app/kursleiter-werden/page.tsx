import type { Metadata } from "next";
import { PLACEHOLDER_BENEFITS } from "@/lib/placeholder-data";
import { BenefitsGrid } from "@/components/organisms/benefits-grid";
import { ApplicationForm } from "@/components/organisms/application-form";

export const metadata: Metadata = {
  title: "Werde Kursleiter",
  description:
    "Teile deine Leidenschaft – werde Gastgeber in unserem Kochatelier.",
};

export default function KursleiterWerdenPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Teile deine Leidenschaft – Werde Kursleiter!
        </h1>
        <p className="text-foreground/60 mt-3 text-lg">
          Du liebst es zu kochen und möchtest dein Wissen weitergeben? Dann bist
          du bei uns genau richtig. Wir stellen dir die Location, du bringst die
          Idee.
        </p>
      </div>
      <BenefitsGrid benefits={PLACEHOLDER_BENEFITS} />
      <ApplicationForm />
    </main>
  );
}
