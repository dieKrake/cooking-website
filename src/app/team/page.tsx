import type { Metadata } from "next";
import { PLACEHOLDER_TEAM } from "@/lib/placeholder-data";
import { TeamGrid } from "@/components/organisms/team-grid";

export const metadata: Metadata = {
  title: "Unser Team",
  description:
    "Lerne unsere Kursleiter kennen – echte Menschen mit Leidenschaft fürs Kochen.",
};

export default function TeamPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">
          Meet the Chef – die Gesichter hinterm Herd
        </h1>
        <p className="text-foreground/60 mt-3 text-lg">
          Unsere Kursleiter bringen echte Leidenschaft, Handwerk und ihre ganz
          persönlichen Geschichten mit in die Küche.
        </p>
      </div>
      <TeamGrid members={PLACEHOLDER_TEAM} />
    </main>
  );
}
