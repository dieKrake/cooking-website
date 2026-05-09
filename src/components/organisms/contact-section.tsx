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

const INITIAL_STATE: FormState = { name: "", email: "", message: "" };

export function ContactSection() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
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
            className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted"
          >
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p className="font-medium">E-Mail</p>
              <p className="text-sm text-foreground/60">{CONTACT_INFO.email}</p>
            </div>
          </a>
          <a
            href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
            className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted"
          >
            <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p className="font-medium">Telefon</p>
              <p className="text-sm text-foreground/60">{CONTACT_INFO.phone}</p>
            </div>
          </a>
          <div className="flex items-start gap-4 rounded-lg border p-4">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p className="font-medium">Adresse</p>
              <p className="text-sm text-foreground/60">
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
          <div className="flex items-center justify-center rounded-xl border border-primary/20 bg-primary/5 px-6 py-10 text-center">
            <div>
              <p className="text-2xl font-semibold">Nachricht gesendet! ✉️</p>
              <p className="mt-2 text-foreground/60">
                Wir melden uns so schnell wie möglich bei dir.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
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
              />
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
              />
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
              />
            </div>
            <Button type="submit" size="lg" className="self-start">
              Nachricht senden
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
