"use client";

import { useState, useActionState, startTransition } from "react";
import { updateEvent, logout } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Image as ImageIcon, CheckCircle2, LogOut, Loader2, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface EventFormProps {
  initialData: {
    title: string;
    description: string;
    date: string;
    imagePath: string;
  };
}

export function EventForm({ initialData }: EventFormProps) {
  const [imagePreview, setImagePreview] = useState<string>(initialData.imagePath);
  const [isSuccess, setIsSuccess] = useState(false);

  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const result = await updateEvent(prevState, formData);
      if (result?.success) {
        setIsSuccess(true);
        return { success: true };
      }
      return { error: result?.error || "Ein Fehler ist aufgetreten." };
    },
    null
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        alert("Das Bild darf maximal 4 MB groß sein.");
        e.target.value = "";
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleLogout = () => {
    startTransition(() => {
      logout();
    });
  };

  if (isSuccess) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-background p-8 text-center shadow-sm space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Event erfolgreich aktualisiert!
          </h2>
          <div className="text-foreground/70 space-y-4 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
            <p>
              Die neuen Daten und das Bild wurden erfolgreich in dein GitHub-Repository committet.
            </p>
            <p className="font-medium text-primary">
              Vercel baut die Website jetzt im Hintergrund neu.
            </p>
            <p className="text-xs text-foreground/50">
              Dieser Vorgang dauert in der Regel ca. 2 bis 3 Minuten. Sobald der Build abgeschlossen ist, wird das neue Event direkt auf der Startseite angezeigt.
            </p>
          </div>
          <div className="pt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Zur Startseite
            </Link>
            <Button
              onClick={() => {
                setImagePreview(initialData.imagePath);
                setIsSuccess(false);
                window.location.reload();
              }}
              variant="brand"
              className="cursor-pointer font-semibold px-5 py-2.5 text-sm"
            >
              Weiteres Event bearbeiten
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Event bearbeiten
          </h1>
          <p className="mt-1 text-sm text-foreground/60">
            Ändere hier die Details für das Highlight-Event auf der Startseite.
          </p>
        </div>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="cursor-pointer gap-2 border-destructive/20 text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          Abmelden
        </Button>
      </div>

      <form action={formAction} className="mt-8 grid gap-8 md:grid-cols-3">
        {/* Left column: Form Fields */}
        <div className="space-y-6 md:col-span-2">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-foreground">
              Event-Titel <span className="text-primary">*</span>
            </label>
            <Input
              id="title"
              name="title"
              type="text"
              required
              defaultValue={initialData.title}
              placeholder="z.B. Sommer-Grillen & Craft Beer"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="date" className="text-sm font-medium text-foreground">
              Datum <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <Input
                id="date"
                name="date"
                type="text"
                required
                defaultValue={initialData.date}
                placeholder="z.B. 15. Juli 2026"
                className="w-full pl-10"
              />
              <Calendar className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-foreground/40" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-foreground">
              Beschreibung <span className="text-primary">*</span>
            </label>
            <Textarea
              id="description"
              name="description"
              required
              defaultValue={initialData.description}
              placeholder="Beschreibe das Event, Menüdetails und Besonderheiten..."
              rows={6}
              className="w-full"
            />
          </div>

          {state?.error && (
            <p className="text-sm font-medium text-destructive" role="alert">
              {state.error}
            </p>
          )}

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              size="lg"
              className="min-w-44 cursor-pointer justify-center gap-2 py-3 text-base font-semibold"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Wird gepusht...
                </>
              ) : (
                "Änderungen pushen"
              )}
            </Button>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
            >
              Abbrechen
            </Link>
          </div>
        </div>

        {/* Right column: Image upload and Live Preview */}
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-muted/40 p-6 space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/60">
              Event-Bild
            </h3>

            {/* Live Preview Container */}
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg border border-border bg-background">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Event Vorschau"
                  fill
                  className="object-cover"
                  unoptimized={imagePreview.startsWith("blob:")}
                />
              ) : (
                <div className="flex h-full items-center justify-center text-foreground/40">
                  <ImageIcon className="h-12 w-12" />
                </div>
              )}
            </div>

            {/* Input File */}
            <div className="space-y-2">
              <label
                htmlFor="image"
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
              >
                <ImageIcon className="h-4 w-4" />
                Bild auswählen...
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                disabled={isPending}
              />
              <p className="text-center text-xs text-foreground/40">
                Maximal 4 MB (WebP, JPG, PNG empfohlen)
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
