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

export function ApplicationForm() {
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

  if (submitted) {
    return (
      <section className="py-12">
        <div className="rounded-xl border border-primary/20 bg-primary/5 px-6 py-10 text-center">
          <p className="text-2xl font-semibold">Danke für deine Bewerbung! 🎉</p>
          <p className="mt-2 text-foreground/60">
            Wir melden uns so schnell wie möglich bei dir.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <SectionHeading title="Jetzt bewerben" subtitle="Erzähl uns von dir und deiner Idee." />
      <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2" noValidate>
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
          />
        </div>
        <div className="sm:col-span-2">
          <Button type="submit" size="lg">
            Bewerbung absenden
          </Button>
        </div>
      </form>
    </section>
  );
}
