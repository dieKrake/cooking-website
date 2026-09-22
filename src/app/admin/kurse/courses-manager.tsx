"use client";

import { useState, useActionState, useTransition } from "react";
import { format, parse } from "date-fns";
import Image from "next/image";
import { saveCourse, deleteCourse } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Calendar as CalendarIcon,
  Image as ImageIcon,
  CheckCircle2,
  Loader2,
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Course } from "@/types";

interface CoursesManagerProps {
  initialCourses: Course[];
}

type View =
  | { mode: "list" }
  | { mode: "form"; course: Course | null }
  | { mode: "success"; message: string };

export function CoursesManager({ initialCourses }: CoursesManagerProps) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [view, setView] = useState<View>({ mode: "list" });

  if (view.mode === "success") {
    return (
      <SuccessScreen
        message={view.message}
        onBack={() => setView({ mode: "list" })}
      />
    );
  }

  if (view.mode === "form") {
    return (
      <CourseForm
        course={view.course}
        onCancel={() => setView({ mode: "list" })}
        onSaved={(saved, isNew) => {
          setCourses((prev) =>
            isNew
              ? [...prev, saved]
              : prev.map((c) => (c.slug === saved.slug ? saved : c)),
          );
          setView({
            mode: "success",
            message: isNew
              ? `Der Kurs "${saved.title}" wurde erfolgreich angelegt.`
              : `Der Kurs "${saved.title}" wurde erfolgreich aktualisiert.`,
          });
        }}
      />
    );
  }

  return (
    <CourseList
      courses={courses}
      onAdd={() => setView({ mode: "form", course: null })}
      onEdit={(course) => setView({ mode: "form", course })}
      onDeleted={(slug, title) => {
        setCourses((prev) => prev.filter((c) => c.slug !== slug));
        setView({
          mode: "success",
          message: `Der Kurs "${title}" wurde erfolgreich gelöscht.`,
        });
      }}
    />
  );
}

function SuccessScreen({
  message,
  onBack,
}: {
  message: string;
  onBack: () => void;
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="border-border bg-background space-y-6 rounded-2xl border p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h2 className="text-foreground text-3xl font-bold tracking-tight">
          Kurs gespeichert!
        </h2>
        <div className="text-foreground/70 mx-auto max-w-md space-y-4 text-sm leading-relaxed sm:text-base">
          <p>{message}</p>
          <p className="font-medium">
            Vercel baut die Website jetzt im Hintergrund neu.
          </p>
          <p className="text-foreground/50 text-xs">
            Dieser Vorgang dauert in der Regel ca. 2 bis 3 Minuten. Sobald der
            Build abgeschlossen ist, sind die Änderungen auf der Website
            sichtbar.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 pt-6">
          <Button
            onClick={onBack}
            variant="outline"
            className="cursor-pointer gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück zur Kursübersicht
          </Button>
        </div>
      </div>
    </div>
  );
}

function CourseList({
  courses,
  onAdd,
  onEdit,
  onDeleted,
}: {
  courses: Course[];
  onAdd: () => void;
  onEdit: (course: Course) => void;
  onDeleted: (slug: string, title: string) => void;
}) {
  const [confirmSlug, setConfirmSlug] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, startDeleting] = useTransition();

  const handleDelete = (course: Course) => {
    setDeleteError(null);
    startDeleting(async () => {
      const result = await deleteCourse(course.slug);
      if (result?.success) {
        setConfirmSlug(null);
        onDeleted(course.slug, course.title);
      } else {
        setDeleteError(result?.error || "Ein Fehler ist aufgetreten.");
      }
    });
  };

  return (
    <div className="py-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-foreground text-xl font-bold tracking-tight">
            Kurse verwalten
          </h2>
          <p className="text-foreground/60 mt-1 text-sm">
            Bearbeite, lösche oder erstelle die Kochkurse der Website.
          </p>
        </div>
        <Button onClick={onAdd} className="cursor-pointer gap-2">
          <Plus className="h-4 w-4" />
          Neuen Kurs hinzufügen
        </Button>
      </div>

      {deleteError && (
        <p className="text-destructive mt-4 text-sm font-medium" role="alert">
          {deleteError}
        </p>
      )}

      {courses.length === 0 ? (
        <div className="border-border text-foreground/60 mt-8 rounded-xl border border-dashed p-10 text-center text-sm">
          Es sind noch keine Kurse vorhanden. Lege den ersten Kurs an!
        </div>
      ) : (
        <ul className="mt-8 space-y-4">
          {courses.map((course) => (
            <li
              key={course.slug}
              className="border-border bg-background flex flex-wrap items-center gap-4 rounded-xl border p-4 shadow-sm"
            >
              <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-foreground truncate font-semibold">
                    {course.title}
                  </h3>
                  <Badge variant="secondary">{course.category}</Badge>
                </div>
                <p className="text-foreground/60 mt-1 text-sm">
                  {course.hasFixedDate && course.date
                    ? `${formatDate(course.date)}${course.time ? ` · ${course.time}` : ""}`
                    : "Ohne festes Datum"}
                  {course.price != null && ` · ${course.price} €`}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {confirmSlug === course.slug ? (
                  <>
                    <span className="text-foreground/70 text-sm">
                      Wirklich löschen?
                    </span>
                    <Button
                      onClick={() => handleDelete(course)}
                      variant="destructive"
                      size="sm"
                      className="cursor-pointer gap-1"
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                      Ja, löschen
                    </Button>
                    <Button
                      onClick={() => setConfirmSlug(null)}
                      variant="outline"
                      size="sm"
                      className="cursor-pointer"
                      disabled={isDeleting}
                    >
                      Abbrechen
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => onEdit(course)}
                      variant="outline"
                      size="sm"
                      className="cursor-pointer gap-1"
                    >
                      <Pencil className="h-4 w-4" />
                      Bearbeiten
                    </Button>
                    <Button
                      onClick={() => setConfirmSlug(course.slug)}
                      variant="outline"
                      size="sm"
                      className="border-destructive/20 text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer gap-1"
                    >
                      <Trash2 className="h-4 w-4" />
                      Löschen
                    </Button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CourseForm({
  course,
  onCancel,
  onSaved,
}: {
  course: Course | null;
  onCancel: () => void;
  onSaved: (saved: Course, isNew: boolean) => void;
}) {
  const isNew = course === null;
  const [imagePreview, setImagePreview] = useState<string>(course?.image ?? "");
  const [hasFixedDate, setHasFixedDate] = useState(
    course?.hasFixedDate ?? true,
  );
  const [highlights, setHighlights] = useState<string[]>(
    course?.highlights?.length ? course.highlights : [""],
  );

  const [date, setDate] = useState<Date | undefined>(() => {
    if (course?.date) {
      const parsed = parse(course.date, "yyyy-MM-dd", new Date());
      if (!isNaN(parsed.getTime())) return parsed;
    }
    return undefined;
  });
  const [dateInputValue, setDateInputValue] = useState(course?.date ?? "");

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setDateInputValue(format(selectedDate, "yyyy-MM-dd"));
    }
  };

  const [state, formAction, isPending] = useActionState(
    async (_prevState: unknown, formData: FormData) => {
      const result = await saveCourse(null, formData);
      if (result?.success && result.course) {
        onSaved(result.course, isNew);
        return { success: true };
      }
      return { error: result?.error || "Ein Fehler ist aufgetreten." };
    },
    null,
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        alert("Das Bild darf maximal 4 MB groß sein.");
        e.target.value = "";
        return;
      }
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="py-6">
      <div>
        <h2 className="text-foreground text-xl font-bold tracking-tight">
          {isNew ? "Neuen Kurs anlegen" : `Kurs bearbeiten: ${course.title}`}
        </h2>
        <p className="text-foreground/60 mt-1 text-sm">
          {isNew
            ? "Fülle die Felder aus, um einen neuen Kochkurs zu veröffentlichen."
            : "Ändere hier die Details des Kurses."}
        </p>
      </div>

      <form action={formAction} className="mt-8 grid gap-8 md:grid-cols-3">
        {course && (
          <input type="hidden" name="editingSlug" value={course.slug} />
        )}
        <input type="hidden" name="currentImage" value={course?.image ?? ""} />

        {/* Left column: Form Fields */}
        <div className="space-y-6 md:col-span-2">
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-foreground text-sm font-medium"
            >
              Kurs-Titel <span className="text-primary">*</span>
            </label>
            <Input
              id="title"
              name="title"
              type="text"
              required
              defaultValue={course?.title ?? ""}
              placeholder="z.B. Pasta Kurs + Aperol"
              className="w-full"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="category"
                className="text-foreground text-sm font-medium"
              >
                Kategorie <span className="text-primary">*</span>
              </label>
              <Input
                id="category"
                name="category"
                type="text"
                required
                defaultValue={course?.category ?? ""}
                placeholder="z.B. Italienisch"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="instructor"
                className="text-foreground text-sm font-medium"
              >
                Kursleiter
              </label>
              <Input
                id="instructor"
                name="instructor"
                type="text"
                defaultValue={course?.instructor ?? ""}
                placeholder="z.B. Fabry"
                className="w-full"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 rounded-lg border p-4">
            <input
              type="checkbox"
              id="hasFixedDate"
              name="hasFixedDate"
              checked={hasFixedDate}
              onChange={(e) => setHasFixedDate(e.target.checked)}
              className="text-primary focus:ring-primary h-4 w-4 rounded border-gray-300"
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="hasFixedDate"
                className="text-sm leading-none font-medium"
              >
                Kurs hat ein festes Datum
              </label>
              <p className="text-muted-foreground text-xs">
                Kurse mit festem Datum erscheinen im Kurs-Slider auf der
                Startseite.
              </p>
            </div>
          </div>

          {hasFixedDate && (
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="date"
                  className="text-foreground text-sm font-medium"
                >
                  Datum <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <Popover>
                    <PopoverTrigger className="relative w-full cursor-pointer">
                      <Input
                        id="date"
                        name="date"
                        type="text"
                        required
                        value={dateInputValue}
                        onChange={(e) => setDateInputValue(e.target.value)}
                        placeholder="z.B. 2026-09-05"
                        className="w-full cursor-pointer pl-10"
                      />
                      <CalendarIcon className="text-foreground/40 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="time"
                  className="text-foreground text-sm font-medium"
                >
                  Uhrzeit
                </label>
                <Input
                  id="time"
                  name="time"
                  type="text"
                  defaultValue={course?.time ?? ""}
                  placeholder="z.B. 18:00 Uhr"
                  className="w-full"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="price"
              className="text-foreground text-sm font-medium"
            >
              Preis (€)
            </label>
            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              defaultValue={course?.price ?? ""}
              placeholder="z.B. 65"
              className="w-full sm:max-w-48"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="shortDescription"
              className="text-foreground text-sm font-medium"
            >
              Kurzbeschreibung <span className="text-primary">*</span>
            </label>
            <Textarea
              id="shortDescription"
              name="shortDescription"
              required
              defaultValue={course?.shortDescription ?? ""}
              placeholder="Kurzer Teaser-Text für die Kurskarte..."
              rows={2}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="longDescription"
              className="text-foreground text-sm font-medium"
            >
              Ausführliche Beschreibung <span className="text-primary">*</span>
            </label>
            <Textarea
              id="longDescription"
              name="longDescription"
              required
              defaultValue={course?.longDescription ?? ""}
              placeholder="Beschreibe den Kurs, Inhalte und Besonderheiten..."
              rows={6}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <span className="text-foreground text-sm font-medium">
              Highlights
            </span>
            <p className="text-muted-foreground text-xs">
              Stichpunkte, die auf der Kurs-Detailseite angezeigt werden.
            </p>
            <div className="space-y-2">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    name="highlights[]"
                    type="text"
                    value={highlight}
                    onChange={(e) =>
                      setHighlights((prev) =>
                        prev.map((h, i) => (i === index ? e.target.value : h)),
                      )
                    }
                    placeholder={`Highlight ${index + 1}`}
                    className="w-full"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="shrink-0 cursor-pointer"
                    aria-label="Highlight entfernen"
                    onClick={() =>
                      setHighlights((prev) =>
                        prev.filter((_, i) => i !== index),
                      )
                    }
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="cursor-pointer gap-1"
              onClick={() => setHighlights((prev) => [...prev, ""])}
            >
              <Plus className="h-4 w-4" />
              Highlight hinzufügen
            </Button>
          </div>

          {state?.error && (
            <p className="text-destructive text-sm font-medium" role="alert">
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
                  Wird gespeichert...
                </>
              ) : isNew ? (
                "Kurs anlegen"
              ) : (
                "Änderungen speichern"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="cursor-pointer"
              onClick={onCancel}
              disabled={isPending}
            >
              Abbrechen
            </Button>
          </div>
        </div>

        {/* Right column: Image upload and Live Preview */}
        <div className="space-y-6">
          <div className="border-border bg-muted/40 space-y-6 rounded-xl border p-6">
            <h3 className="text-foreground/60 text-sm font-semibold tracking-wider uppercase">
              Kurs-Bild {isNew && <span className="text-primary">*</span>}
            </h3>

            {/* Live Preview Container */}
            <div className="border-border bg-background relative aspect-4/3 w-full overflow-hidden rounded-lg border">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Kurs Vorschau"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 300px"
                  unoptimized={imagePreview.startsWith("blob:")}
                />
              ) : (
                <div className="text-foreground/40 flex h-full items-center justify-center">
                  <ImageIcon className="h-12 w-12" />
                </div>
              )}
            </div>

            {/* Input File */}
            <div className="space-y-2">
              <label
                htmlFor="image"
                className="border-border bg-background text-foreground hover:bg-muted inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors"
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
              <p className="text-foreground/40 text-center text-xs">
                Maximal 4 MB (WebP, JPG, PNG empfohlen)
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
