"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/molecules/form-field";
import { CONTACT_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { ContactFormConfig } from "@/types";

interface ContactFormProps {
  config: ContactFormConfig;
  id?: string;
  className?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function buildInitialState(config: ContactFormConfig): Record<string, string> {
  return config.fields.reduce<Record<string, string>>((state, field) => {
    state[field.name] = field.defaultValue ?? "";
    return state;
  }, {});
}

function validate(
  config: ContactFormConfig,
  form: Record<string, string>,
): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const field of config.fields) {
    const value = (form[field.name] ?? "").trim();
    if (field.required && !value) {
      errors[field.name] =
        field.requiredMessage ?? `Bitte fülle das Feld „${field.label}" aus.`;
      continue;
    }
    if (!value) continue;
    if (field.type === "email" && !EMAIL_REGEX.test(value)) {
      errors[field.name] = "Bitte gib eine gültige E-Mail-Adresse ein.";
    }
    if (
      field.type === "number" &&
      typeof field.min === "number" &&
      Number(value) < field.min
    ) {
      errors[field.name] =
        field.requiredMessage ?? "Bitte gib eine gültige Zahl ein.";
    }
  }
  return errors;
}

export function ContactForm({ config, id, className }: ContactFormProps) {
  const [form, setForm] = useState<Record<string, string>>(() =>
    buildInitialState(config),
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
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
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors = validate(config, form);
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
        body: JSON.stringify({
          type: config.type,
          title: config.title,
          ...form,
        }),
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
      id={id}
      className={cn("mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8", className)}
    >
      <div className="grid overflow-hidden rounded-3xl shadow-[0_24px_60px_-28px_rgba(29,29,27,0.5)] ring-1 ring-black/5 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Akzentspalte */}
        <div className="text-pure-white relative flex flex-col justify-between overflow-hidden p-8 sm:p-10">
          {config.accentImage ? (
            <Image
              src={config.accentImage}
              alt={config.accentImageAlt ?? ""}
              fill
              aria-hidden={!config.accentImageAlt}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, (max-width: 1536px) 40vw, 500px"
              quality={75}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div aria-hidden className="bg-deep-black absolute inset-0" />
          )}
          <div
            aria-hidden
            className="from-deep-black/95 via-deep-black/80 to-deep-black/60 absolute inset-0 bg-linear-to-t"
          />
          <div className="relative z-10">
            {config.accentEyebrow && (
              <span className="text-pasta-gelb/90 font-heading text-xs tracking-[0.35em] uppercase">
                {config.accentEyebrow}
              </span>
            )}
            <span aria-hidden className="bg-pasta-gelb mt-4 block h-px w-10" />
            <h2 className="font-heading mt-4 text-3xl leading-tight tracking-tight sm:text-4xl">
              {config.title}
            </h2>
            {config.subtitle && (
              <p className="text-pure-white/75 mt-3 max-w-prose text-sm leading-relaxed">
                {config.subtitle}
              </p>
            )}
          </div>

          {config.showContactInfo && (
            <div className="relative z-10 mt-10 space-y-3">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="hover:text-pasta-gelb flex items-start gap-3 transition-colors"
              >
                <Mail className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                <span className="text-sm">{CONTACT_INFO.email}</span>
              </a>
              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                className="hover:text-pasta-gelb flex items-start gap-3 transition-colors"
              >
                <Phone className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                <span className="text-sm">{CONTACT_INFO.phone}</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0"
                  aria-hidden="true"
                />
                <span className="text-sm">
                  {CONTACT_INFO.address.street}
                  <br />
                  {CONTACT_INFO.address.zip} {CONTACT_INFO.address.city}
                  <br />
                  {CONTACT_INFO.address.country}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Formularspalte */}
        <div className="bg-pure-white p-8 sm:p-10">
          {submitted ? (
            <div className="flex h-full min-h-64 flex-col items-center justify-center text-center">
              <p className="font-heading text-2xl font-semibold">
                {config.successTitle ?? "Nachricht gesendet!"}
              </p>
              <p className="text-foreground/60 mt-2">
                {config.successText ??
                  "Wir melden uns so schnell wie möglich bei dir."}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="grid gap-5 sm:grid-cols-2"
              noValidate
            >
              {config.fields.map((field) => (
                <FormField
                  key={field.name}
                  field={field}
                  value={form[field.name] ?? ""}
                  error={errors[field.name]}
                  idPrefix={config.type}
                  onChange={handleChange}
                />
              ))}
              <div className="flex flex-col gap-3 sm:col-span-2">
                {submitError && (
                  <p className="text-destructive text-sm">{submitError}</p>
                )}
                <Button
                  type="submit"
                  size="lg"
                  variant="brand"
                  className="cursor-pointer self-start"
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Wird gesendet…"
                    : (config.submitLabel ?? "Absenden")}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
