import type { Metadata } from "next";
import { PLACEHOLDER_TEAM } from "@/lib/placeholder-data";

export const metadata: Metadata = {
  title: "Unser Team",
  description: "Lerne unsere Kursleiter kennen – echte Menschen mit Leidenschaft.",
};

export default function TeamPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Meet the Chef – die Gesichter hinterm Herd</h1>
      <p className="mt-2 text-gray-600">
        Placeholder – Team. Hier entsteht das TeamGrid mit TeamCard-Komponenten.
      </p>

      <ul className="mt-8 space-y-4">
        {PLACEHOLDER_TEAM.map((member) => (
          <li key={member.id} className="border p-4 rounded">
            <strong>{member.name}</strong> – {member.role}
            <p className="mt-1 text-sm text-gray-600">{member.bio}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
