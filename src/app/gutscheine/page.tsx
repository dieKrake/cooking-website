import type { Metadata } from "next";
import { GUTSCHEINE_PAGE } from "@/lib/placeholder-data";
import { VoucherOptions } from "@/components/organisms/voucher-options";
import { VoucherIdeas } from "@/components/organisms/voucher-ideas";
import { VoucherForm } from "@/components/organisms/voucher-form";

export const metadata: Metadata = {
  title: GUTSCHEINE_PAGE.title,
  description: GUTSCHEINE_PAGE.description,
};

export default function GutscheinePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-4">
        <h1 className="text-4xl font-bold tracking-tight">
          {GUTSCHEINE_PAGE.title}
        </h1>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">
          {GUTSCHEINE_PAGE.subtitle}
        </h2>
        <p className="text-foreground/60 mt-3 text-lg">
          {GUTSCHEINE_PAGE.intro}
        </p>
        <p className="text-foreground/60 mt-3 text-lg">
          {GUTSCHEINE_PAGE.introSecond}
        </p>
      </div>
      <VoucherOptions />
      <VoucherIdeas />
      <VoucherForm />
    </main>
  );
}
