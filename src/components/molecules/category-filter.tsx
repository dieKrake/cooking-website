"use client";

import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
}

export function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Kurse nach Kategorie filtern">
      <button
        onClick={() => onChange("Alle")}
        className={cn(
          "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
          active === "Alle"
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-background hover:bg-muted",
        )}
      >
        Alle
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
            active === category
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background hover:bg-muted",
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
