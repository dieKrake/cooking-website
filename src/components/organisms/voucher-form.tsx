"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/atoms/section-heading";

interface FormState {
  amount: string;
  format: string;
  recipientName: string;
  message: string;
  buyerName: string;
  buyerEmail: string;
}

const INITIAL_STATE: FormState = {
  amount: "",
  format: "digital",
  recipientName: "",
  message: "",
  buyerName: "",
  buyerEmail: "",
};

const AMOUNTS = ["50", "75", "100", "150"];

export function VoucherForm() {
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
          <p className="text-2xl font-semibold">Bestellung eingegangen! 🎁</p>
          <p className="text-foreground/60 mt-2">
            Wir senden dir den Gutschein so schnell wie möglich zu.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <SectionHeading
        title="Gutschein bestellen"
        subtitle="Füll das Formular aus – wir kümmern uns um den Rest."
      />
      <form
        onSubmit={handleSubmit}
        className="grid gap-5 sm:grid-cols-2"
        noValidate
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="amount" className="text-sm font-medium">
            Betrag <span aria-hidden="true">*</span>
          </label>
          <select
            id="amount"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            required
            className="border-input focus-visible:border-ring focus-visible:ring-ring/50 h-8 w-full rounded-lg border bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:ring-3"
          >
            <option value="" disabled>
              Bitte wählen …
            </option>
            {AMOUNTS.map((a) => (
              <option key={a} value={a}>
                {a} €
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="format" className="text-sm font-medium">
            Format <span aria-hidden="true">*</span>
          </label>
          <select
            id="format"
            name="format"
            value={form.format}
            onChange={handleChange}
            required
            className="border-input focus-visible:border-ring focus-visible:ring-ring/50 h-8 w-full rounded-lg border bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:ring-3"
          >
            <option value="digital">Digital (PDF per E-Mail)</option>
            <option value="gedruckt">Gedruckt (per Post)</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="recipientName" className="text-sm font-medium">
            Name der beschenkten Person{" "}
            <span className="text-foreground/40">(optional)</span>
          </label>
          <Input
            id="recipientName"
            name="recipientName"
            value={form.recipientName}
            onChange={handleChange}
            placeholder="z. B. Maria"
          />
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="message" className="text-sm font-medium">
            Persönliche Nachricht{" "}
            <span className="text-foreground/40">(optional)</span>
          </label>
          <Textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Eine kleine Widmung für den Gutschein …"
            rows={3}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="buyerName" className="text-sm font-medium">
            Dein Name <span aria-hidden="true">*</span>
          </label>
          <Input
            id="buyerName"
            name="buyerName"
            value={form.buyerName}
            onChange={handleChange}
            placeholder="Dein Name"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="buyerEmail" className="text-sm font-medium">
            Deine E-Mail <span aria-hidden="true">*</span>
          </label>
          <Input
            id="buyerEmail"
            name="buyerEmail"
            type="email"
            value={form.buyerEmail}
            onChange={handleChange}
            placeholder="deine@email.de"
            required
          />
        </div>
        <div className="sm:col-span-2">
          <Button
            type="submit"
            size="lg"
            className="cursor-pointer"
            variant="outline"
          >
            Jetzt bestellen
          </Button>
        </div>
      </form>
    </section>
  );
}
