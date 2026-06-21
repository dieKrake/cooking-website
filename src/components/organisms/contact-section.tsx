"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/atoms/section-heading";
import { CONTACT_INFO } from "@/lib/constants";

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const INITIAL_STATE: FormState = { name: "", email: "", message: "" };
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Bitte gib deinen Namen ein.";
  if (!form.email.trim()) {
    errors.email = "Bitte gib deine E-Mail-Adresse ein.";
  } else if (!EMAIL_REGEX.test(form.email)) {
    errors.email = "Bitte gib eine gültige E-Mail-Adresse ein.";
  }
  if (!form.message.trim())
    errors.message = "Bitte schreib uns eine Nachricht.";
  return errors;
}

export function ContactSection() {
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
        body: JSON.stringify({ type: "contact", ...form }),
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

  return (
    <section
      id="kontakt"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <SectionHeading
        title="Kontakt"
        subtitle="Schreib uns oder ruf einfach an – wir melden uns schnell."
      />
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-white/5"
          >
            <Mail
              className="text-pasta-gelb mt-0.5 h-5 w-5 shrink-0"
              aria-hidden="true"
            />
            <div>
              <p className="font-medium">E-Mail</p>
              <p className="text-foreground/60 text-sm">{CONTACT_INFO.email}</p>
            </div>
          </a>
          <a
            href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
            className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-white/5"
          >
            <Phone
              className="text-pasta-gelb mt-0.5 h-5 w-5 shrink-0"
              aria-hidden="true"
            />
            <div>
              <p className="font-medium">Telefon</p>
              <p className="text-foreground/60 text-sm">{CONTACT_INFO.phone}</p>
            </div>
          </a>
          <div className="flex items-start gap-4 rounded-lg border p-4">
            <MapPin
              className="text-pasta-gelb mt-0.5 h-5 w-5 shrink-0"
              aria-hidden="true"
            />
            <div>
              <p className="font-medium">Adresse</p>
              <p className="text-foreground/60 text-sm">
                {CONTACT_INFO.address.street}
                <br />
                {CONTACT_INFO.address.zip} {CONTACT_INFO.address.city}
                <br />
                {CONTACT_INFO.address.country}
              </p>
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="border-border bg-card flex items-center justify-center rounded-xl border px-6 py-10 text-center">
            <div>
              <p className="text-2xl font-semibold">Nachricht gesendet! ✉️</p>
              <p className="text-foreground/60 mt-2">
                Wir melden uns so schnell wie möglich bei dir.
              </p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            noValidate
          >
            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-name" className="text-sm font-medium">
                Name <span aria-hidden="true">*</span>
              </label>
              <Input
                id="contact-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Dein Name"
                required
                aria-invalid={!!errors.name}
                aria-describedby={
                  errors.name ? "contact-name-error" : undefined
                }
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p id="contact-name-error" className="text-destructive text-sm">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-email" className="text-sm font-medium">
                E-Mail <span aria-hidden="true">*</span>
              </label>
              <Input
                id="contact-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="deine@email.de"
                required
                aria-invalid={!!errors.email}
                aria-describedby={
                  errors.email ? "contact-email-error" : undefined
                }
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p
                  id="contact-email-error"
                  className="text-destructive text-sm"
                >
                  {errors.email}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-message" className="text-sm font-medium">
                Nachricht <span aria-hidden="true">*</span>
              </label>
              <Textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Wie können wir dir helfen?"
                rows={5}
                required
                aria-invalid={!!errors.message}
                aria-describedby={
                  errors.message ? "contact-message-error" : undefined
                }
                className={errors.message ? "border-destructive" : ""}
              />
              {errors.message && (
                <p
                  id="contact-message-error"
                  className="text-destructive text-sm"
                >
                  {errors.message}
                </p>
              )}
            </div>
            {submitError && (
              <p className="text-destructive text-sm">{submitError}</p>
            )}
            <Button
              type="submit"
              size="lg"
              className="cursor-pointer self-start"
              variant="brandSecondary"
              disabled={isLoading}
            >
              {isLoading ? "Wird gesendet…" : "Nachricht senden"}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
