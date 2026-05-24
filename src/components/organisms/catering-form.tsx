"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/atoms/section-heading";

interface FormState {
  name: string;
  email: string;
  phone: string;
  cuisine: string;
  date: string;
  guests: string;
  message: string;
}

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  phone: "",
  cuisine: "",
  date: "",
  guests: "",
  message: "",
};

const CUISINES = [
  "Orientalisch",
  "Asiatisch",
  "Mediterran",
  "Gesunde Küche",
  "Gemischt",
  "Sonstiges",
];

export function CateringForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="py-12">
        <div className="border-primary/20 bg-primary/5 rounded-xl border px-6 py-10 text-center">
          <p className="text-2xl font-semibold">
            Vielen Dank für deine Anfrage! 🎉
          </p>
          <p className="text-foreground/60 mt-2">
            Wir melden uns innerhalb von 24 Stunden bei dir.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <SectionHeading
        title="Catering anfragen"
        subtitle="Beschreib uns dein Event – wir erstellen dir ein passendes Angebot."
      />
      <form
        onSubmit={handleSubmit}
        className="grid gap-5 sm:grid-cols-2"
        noValidate
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium">
            Name <span aria-hidden="true">*</span>
          </label>
          <Input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Dein Name"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium">
            E-Mail <span aria-hidden="true">*</span>
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="deine@email.de"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-sm font-medium">
            Telefon <span className="text-foreground/40">(optional)</span>
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+49 ..."
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cuisine" className="text-sm font-medium">
            Gewünschte Küche
          </label>
          <select
            id="cuisine"
            name="cuisine"
            value={form.cuisine}
            onChange={handleChange}
            className="border-input focus-visible:border-ring focus-visible:ring-ring/50 h-8 w-full rounded-lg border bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:ring-3"
          >
            <option value="" disabled>
              Bitte wählen …
            </option>
            {CUISINES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="date" className="text-sm font-medium">
            Wunschdatum
          </label>
          <Input
            id="date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="guests" className="text-sm font-medium">
            Anzahl Personen
          </label>
          <Input
            id="guests"
            name="guests"
            type="number"
            min="1"
            value={form.guests}
            onChange={handleChange}
            placeholder="z. B. 20"
          />
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="message" className="text-sm font-medium">
            Nachricht
          </label>
          <Textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Allergien, besondere Wünsche oder weitere Infos …"
            rows={4}
          />
        </div>
        <div className="sm:col-span-2">
          <Button
            type="submit"
            size="lg"
            variant="outline"
            className="cursor-pointer"
          >
            Anfrage absenden
          </Button>
        </div>
      </form>
    </section>
  );
}
