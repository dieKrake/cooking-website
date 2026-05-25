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

interface FormErrors {
  amount?: string;
  buyerName?: string;
  buyerEmail?: string;
}

const AMOUNTS = ["50", "100", "150"];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.amount) errors.amount = "Bitte wähle einen Betrag aus.";
  if (!form.buyerName.trim()) errors.buyerName = "Bitte gib deinen Namen ein.";
  if (!form.buyerEmail.trim()) {
    errors.buyerEmail = "Bitte gib deine E-Mail-Adresse ein.";
  } else if (!EMAIL_REGEX.test(form.buyerEmail)) {
    errors.buyerEmail = "Bitte gib eine gültige E-Mail-Adresse ein.";
  }
  return errors;
}

export function VoucherForm() {
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
        body: JSON.stringify({ type: "voucher", ...form }),
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
            aria-invalid={!!errors.amount}
            aria-describedby={errors.amount ? "amount-error" : undefined}
            className={`border-input focus-visible:border-ring focus-visible:ring-ring/50 h-8 w-full rounded-lg border bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:ring-3${errors.amount ? "border-destructive" : ""}`}
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
          {errors.amount && (
            <p id="amount-error" className="text-destructive text-sm">
              {errors.amount}
            </p>
          )}
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
            aria-invalid={!!errors.buyerName}
            aria-describedby={errors.buyerName ? "buyerName-error" : undefined}
            className={errors.buyerName ? "border-destructive" : ""}
          />
          {errors.buyerName && (
            <p id="buyerName-error" className="text-destructive text-sm">
              {errors.buyerName}
            </p>
          )}
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
            aria-invalid={!!errors.buyerEmail}
            aria-describedby={
              errors.buyerEmail ? "buyerEmail-error" : undefined
            }
            className={errors.buyerEmail ? "border-destructive" : ""}
          />
          {errors.buyerEmail && (
            <p id="buyerEmail-error" className="text-destructive text-sm">
              {errors.buyerEmail}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 sm:col-span-2">
          {submitError && (
            <p className="text-destructive text-sm">{submitError}</p>
          )}
          <div>
            <Button
              type="submit"
              size="lg"
              className="cursor-pointer"
              variant="outline"
              disabled={isLoading}
            >
              {isLoading ? "Wird gesendet…" : "Jetzt bestellen"}
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
