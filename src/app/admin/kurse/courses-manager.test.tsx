import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { CoursesManager } from "./courses-manager";
import type { Course } from "@/types";

const { saveCourseMock, deleteCourseMock } = vi.hoisted(() => ({
  saveCourseMock: vi.fn(),
  deleteCourseMock: vi.fn(),
}));

vi.mock("./actions", () => ({
  saveCourse: saveCourseMock,
  deleteCourse: deleteCourseMock,
}));

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

const mockCourses: Course[] = [
  {
    slug: "pasta",
    title: "Pasta Kurs + Aperol",
    shortDescription: "Kurz",
    longDescription: "Lang",
    date: "2026-09-05",
    time: "18:00 Uhr",
    price: 65,
    image: "/images/Tomate-Culina.webp",
    instructor: "Fabry",
    hasFixedDate: true,
    category: "Italienisch",
    highlights: ["Frische Pasta"],
  },
];

describe("CoursesManager", () => {
  beforeEach(() => {
    saveCourseMock.mockReset();
    deleteCourseMock.mockReset();
  });

  it("renders the course list", () => {
    render(<CoursesManager initialCourses={mockCourses} />);
    expect(screen.getByText("Kurse verwalten")).toBeInTheDocument();
    expect(screen.getByText("Pasta Kurs + Aperol")).toBeInTheDocument();
    expect(screen.getByText("Italienisch")).toBeInTheDocument();
  });

  it("shows an empty state without courses", () => {
    render(<CoursesManager initialCourses={[]} />);
    expect(
      screen.getByText(/noch keine Kurse vorhanden/i),
    ).toBeInTheDocument();
  });

  it("opens the form for a new course", async () => {
    render(<CoursesManager initialCourses={mockCourses} />);
    await userEvent.click(
      screen.getByRole("button", { name: /Neuen Kurs hinzufügen/i }),
    );
    expect(screen.getByText("Neuen Kurs anlegen")).toBeInTheDocument();
    expect(screen.getByLabelText(/Kurs-Titel/)).toHaveValue("");
  });

  it("opens the form prefilled when editing", async () => {
    render(<CoursesManager initialCourses={mockCourses} />);
    await userEvent.click(screen.getByRole("button", { name: /Bearbeiten/i }));
    expect(
      screen.getByText(/Kurs bearbeiten: Pasta Kurs \+ Aperol/),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Kurs-Titel/)).toHaveValue(
      "Pasta Kurs + Aperol",
    );
    expect(screen.getByLabelText(/Kategorie/)).toHaveValue("Italienisch");
  });

  it("returns to the list when cancelling the form", async () => {
    render(<CoursesManager initialCourses={mockCourses} />);
    await userEvent.click(screen.getByRole("button", { name: /Bearbeiten/i }));
    await userEvent.click(screen.getByRole("button", { name: "Abbrechen" }));
    expect(screen.getByText("Kurse verwalten")).toBeInTheDocument();
  });

  it("asks for confirmation before deleting", async () => {
    render(<CoursesManager initialCourses={mockCourses} />);
    await userEvent.click(screen.getByRole("button", { name: /Löschen/i }));
    expect(screen.getByText("Wirklich löschen?")).toBeInTheDocument();
    expect(deleteCourseMock).not.toHaveBeenCalled();
  });

  it("deletes a course after confirmation and shows the success screen", async () => {
    deleteCourseMock.mockResolvedValue({ success: true });
    render(<CoursesManager initialCourses={mockCourses} />);
    await userEvent.click(screen.getByRole("button", { name: /^Löschen$/i }));
    await userEvent.click(
      screen.getByRole("button", { name: /Ja, löschen/i }),
    );
    expect(deleteCourseMock).toHaveBeenCalledWith("pasta");
    expect(await screen.findByText("Kurs gespeichert!")).toBeInTheDocument();
    expect(
      screen.getByText(/wurde erfolgreich gelöscht/i),
    ).toBeInTheDocument();
    // Back to the list: course is gone
    await userEvent.click(
      screen.getByRole("button", { name: /Zurück zur Kursübersicht/i }),
    );
    expect(
      screen.getByText(/noch keine Kurse vorhanden/i),
    ).toBeInTheDocument();
  });

  it("shows an error message when deleting fails", async () => {
    deleteCourseMock.mockResolvedValue({ error: "GitHub-Fehler" });
    render(<CoursesManager initialCourses={mockCourses} />);
    await userEvent.click(screen.getByRole("button", { name: /^Löschen$/i }));
    await userEvent.click(
      screen.getByRole("button", { name: /Ja, löschen/i }),
    );
    expect(await screen.findByText("GitHub-Fehler")).toBeInTheDocument();
    expect(screen.getByText("Pasta Kurs + Aperol")).toBeInTheDocument();
  });
});
