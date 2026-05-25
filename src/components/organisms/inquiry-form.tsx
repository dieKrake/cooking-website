"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/atoms/section-heading";

interface FormState {
  name: string;
  email: string;
  occasion: string;
  date: string;
  guests: string;
  message: string;
}

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  occasion: "",
  date: "",
  guests: "",
  message: "",
};

const OCCASIONS = [
  "Geburtstag",
  "Teamevent",
  "Hochzeit",
  "Firmenfeier",
  "Sonstiges",
];

interface FormErrors {
  name?: string;
  email?: string;
  occasion?: string;
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
  if (!form.occasion) errors.occasion = "Bitte wähle einen Anlass aus.";
  if (!form.date) errors.date = "Bitte gib ein Wunschdatum an.";
  if (!form.guests || Number(form.guests) < 1)
    errors.guests = "Bitte gib die Anzahl der Personen an.";
  return errors;
}

export function InquiryForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors = validate(form);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
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
        title="Location anfragen"
        subtitle="Schreib uns – wir erstellen dir ein individuelles Angebot."
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
            aria-describedby={errors.name ? "inquiry-name-error" : undefined}
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && (
            <p id="inquiry-name-error" className="text-destructive text-sm">
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
            aria-describedby={errors.email ? "inquiry-email-error" : undefined}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p id="inquiry-email-error" className="text-destructive text-sm">
              {errors.email}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="occasion" className="text-sm font-medium">
            Anlass <span aria-hidden="true">*</span>
          </label>
          <select
            id="occasion"
            name="occasion"
            value={form.occasion}
            onChange={handleChange}
            required
            aria-invalid={!!errors.occasion}
            aria-describedby={
              errors.occasion ? "inquiry-occasion-error" : undefined
            }
            className={`border-input focus-visible:border-ring focus-visible:ring-ring/50 h-8 w-full rounded-lg border bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:ring-3${errors.occasion ? "border-destructive" : ""}`}
          >
            <option value="" disabled>
              Bitte wählen …
            </option>
            {OCCASIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          {errors.occasion && (
            <p id="inquiry-occasion-error" className="text-destructive text-sm">
              {errors.occasion}
            </p>
          )}
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
            aria-describedby={errors.date ? "inquiry-date-error" : undefined}
            className={errors.date ? "border-destructive" : ""}
          />
          {errors.date && (
            <p id="inquiry-date-error" className="text-destructive text-sm">
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
            max="25"
            value={form.guests}
            onChange={handleChange}
            placeholder="z. B. 12"
            required
            aria-invalid={!!errors.guests}
            aria-describedby={
              errors.guests ? "inquiry-guests-error" : undefined
            }
            className={errors.guests ? "border-destructive" : ""}
          />
          {errors.guests && (
            <p id="inquiry-guests-error" className="text-destructive text-sm">
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
            placeholder="Besondere Wünsche oder Fragen …"
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
