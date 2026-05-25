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

interface FormErrors {
  name?: string;
  email?: string;
  date?: string;
  guests?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Bitte gib deinen Namen ein.";
  if (!form.email.trim()) {
    errors.email = "Bitte gib deine E-Mail-Adresse ein.";
  } else if (!EMAIL_REGEX.test(form.email)) {
    errors.email = "Bitte gib eine gültige E-Mail-Adresse ein.";
  }
  if (!form.date) errors.date = "Bitte gib ein Wunschdatum an.";
  if (!form.guests || Number(form.guests) < 1)
    errors.guests = "Bitte gib die Anzahl der Personen an.";
  return errors;
}

export function CateringForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors = validate(form);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsLoading(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "catering", ...form }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setSubmitError(
        "Beim Senden ist ein Fehler aufgetreten. Bitte versuche es erneut.",
      );
    } finally {
      setIsLoading(false);
    }
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
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "catering-name-error" : undefined}
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && (
            <p id="catering-name-error" className="text-destructive text-sm">
              {errors.name}
            </p>
          )}
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
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "catering-email-error" : undefined}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p id="catering-email-error" className="text-destructive text-sm">
              {errors.email}
            </p>
          )}
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
            Wunschdatum <span aria-hidden="true">*</span>
          </label>
          <Input
            id="date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
            aria-invalid={!!errors.date}
            aria-describedby={errors.date ? "catering-date-error" : undefined}
            className={errors.date ? "border-destructive" : ""}
          />
          {errors.date && (
            <p id="catering-date-error" className="text-destructive text-sm">
              {errors.date}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="guests" className="text-sm font-medium">
            Anzahl Personen <span aria-hidden="true">*</span>
          </label>
          <Input
            id="guests"
            name="guests"
            type="number"
            min="1"
            value={form.guests}
            onChange={handleChange}
            placeholder="z. B. 20"
            required
            aria-invalid={!!errors.guests}
            aria-describedby={
              errors.guests ? "catering-guests-error" : undefined
            }
            className={errors.guests ? "border-destructive" : ""}
          />
          {errors.guests && (
            <p id="catering-guests-error" className="text-destructive text-sm">
              {errors.guests}
            </p>
          )}
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
        <div className="flex flex-col gap-2 sm:col-span-2">
          {submitError && (
            <p className="text-destructive text-sm">{submitError}</p>
          )}
          <div>
            <Button
              type="submit"
              size="lg"
              variant="outline"
              className="cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Wird gesendet…" : "Anfrage absenden"}
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
