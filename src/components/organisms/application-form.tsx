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
  idea: string;
}

const INITIAL_STATE: FormState = { name: "", email: "", phone: "", idea: "" };

interface FormErrors {
  name?: string;
  email?: string;
  idea?: string;
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
  if (!form.idea.trim()) errors.idea = "Bitte beschreibe deine Kursidee.";
  return errors;
}

export function ApplicationForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
        body: JSON.stringify({ type: "application", ...form }),
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
            Danke für deine Bewerbung! 🎉
          </p>
          <p className="text-foreground/60 mt-2">
            Wir melden uns so schnell wie möglich bei dir.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <SectionHeading
        title="Jetzt bewerben"
        subtitle="Erzähl uns von dir und deiner Idee."
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
            aria-describedby={errors.name ? "app-name-error" : undefined}
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && (
            <p id="app-name-error" className="text-destructive text-sm">
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
            aria-describedby={errors.email ? "app-email-error" : undefined}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p id="app-email-error" className="text-destructive text-sm">
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
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="idea" className="text-sm font-medium">
            Deine Kursidee <span aria-hidden="true">*</span>
          </label>
          <Textarea
            id="idea"
            name="idea"
            value={form.idea}
            onChange={handleChange}
            placeholder="Beschreibe kurz, welche Art von Kurs du anbieten möchtest …"
            rows={5}
            required
            aria-invalid={!!errors.idea}
            aria-describedby={errors.idea ? "app-idea-error" : undefined}
            className={errors.idea ? "border-destructive" : ""}
          />
          {errors.idea && (
            <p id="app-idea-error" className="text-destructive text-sm">
              {errors.idea}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 sm:col-span-2">
          {submitError && (
            <p className="text-destructive text-sm">{submitError}</p>
          )}
          <div>
            <Button type="submit" size="lg" disabled={isLoading}>
              {isLoading ? "Wird gesendet…" : "Bewerbung absenden"}
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
