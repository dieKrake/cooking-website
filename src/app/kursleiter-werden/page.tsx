import type { Metadata } from "next";
import { PLACEHOLDER_BENEFITS } from "@/lib/placeholder-data";

export const metadata: Metadata = {
  title: "Werde Kursleiter",
  description:
    "Teile deine Leidenschaft – werde Gastgeber in unserem Kochatelier.",
};

export default function KursleiterWerdenPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">
        Teile deine Leidenschaft – Werde Kursleiter!
      </h1>
      <p className="mt-2 text-gray-600">
        Placeholder – Kursleiter werden. Hier entstehen: HeroSection,
        BenefitsList, ApplicationForm.
      </p>

      <h2 className="mt-8 text-xl font-semibold">Warum du bei uns richtig bist</h2>
      <ul className="mt-4 space-y-3">
        {PLACEHOLDER_BENEFITS.map((benefit) => (
          <li key={benefit.title} className="border p-4 rounded">
            <strong>{benefit.title}</strong>
            <p className="mt-1 text-sm text-gray-600">{benefit.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
