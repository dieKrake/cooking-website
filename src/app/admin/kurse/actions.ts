"use server";

import type { Course } from "@/types";
import { checkAuth } from "../lib/auth";
import {
  getEnvConfig,
  getFileContent,
  pushToGithub,
  deleteFromGithub,
} from "../lib/github";
import { slugify, uniqueSlug, upsertCourse, removeCourse } from "./helpers";

const COURSES_JSON_PATH = "src/lib/courses.json";

type GithubConfig = {
  githubToken: string;
  githubRepo: string;
  githubBranch: string;
};

function getGithubConfigOrError(): GithubConfig | { error: string } {
  const { githubToken, githubRepo, githubBranch } = getEnvConfig();
  if (!githubToken || !githubRepo) {
    return {
      error:
        "GitHub API-Konfiguration (GITHUB_PAT, GITHUB_REPO) fehlt auf dem Server.",
    };
  }
  return { githubToken, githubRepo, githubBranch };
}

/**
 * Loads the current course list fresh from GitHub so that changes made
 * since the last deployment are not lost.
 */
async function fetchCoursesFromGithub(
  config: GithubConfig,
): Promise<Course[] | null> {
  const content = await getFileContent(
    COURSES_JSON_PATH,
    config.githubToken,
    config.githubRepo,
    config.githubBranch,
  );
  if (content === null) return null;
  try {
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? (parsed as Course[]) : null;
  } catch (error) {
    console.error("Error parsing courses.json from GitHub:", error);
    return null;
  }
}

/**
 * Pushes the updated course list to GitHub. This commit triggers the
 * Vercel build so the changes go live.
 */
async function pushCoursesToGithub(
  courses: Course[],
  message: string,
  config: GithubConfig,
): Promise<boolean> {
  const jsonString = JSON.stringify(courses, null, 2) + "\n";
  const jsonBase64 = Buffer.from(jsonString).toString("base64");
  return pushToGithub(
    COURSES_JSON_PATH,
    jsonBase64,
    message,
    config.githubToken,
    config.githubRepo,
    config.githubBranch,
  );
}

/**
 * Uploads a course image to GitHub (with [skip ci] so only the final
 * JSON commit triggers a build). Returns the public image path.
 */
async function uploadCourseImage(
  imageFile: File,
  slug: string,
  config: GithubConfig,
): Promise<{ imagePath: string } | { error: string }> {
  if (imageFile.size > 4 * 1024 * 1024) {
    return { error: "Das Bild darf maximal 4 MB groß sein." };
  }

  const extension = imageFile.name.split(".").pop() || "webp";
  const timestamp = Date.now();
  const imagePath = `/images/courses/${slug}-${timestamp}.${extension}`;

  const imageBuffer = await imageFile.arrayBuffer();
  const imageBase64 = Buffer.from(imageBuffer).toString("base64");

  const success = await pushToGithub(
    `public${imagePath}`,
    imageBase64,
    `media: upload course image for "${slug}" [skip ci]`,
    config.githubToken,
    config.githubRepo,
    config.githubBranch,
  );

  if (!success) {
    return { error: "Fehler beim Hochladen des Bildes auf GitHub." };
  }
  return { imagePath };
}

/**
 * Deletes a previously uploaded course image (only files under
 * /images/courses/). Failures are logged but non-fatal.
 */
async function deleteCourseImage(imagePath: string, config: GithubConfig) {
  if (!imagePath.startsWith("/images/courses/")) return;
  await deleteFromGithub(
    `public${imagePath}`,
    `media: remove old course image [skip ci]`,
    config.githubToken,
    config.githubRepo,
    config.githubBranch,
  );
}

/**
 * Creates a new course or updates an existing one (identified by the
 * hidden "editingSlug" field) and pushes the result to GitHub.
 */
export async function saveCourse(_prevState: unknown, formData: FormData) {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    return { error: "Nicht autorisiert. Bitte melde dich erneut an." };
  }

  const configResult = getGithubConfigOrError();
  if ("error" in configResult) return { error: configResult.error };
  const config = configResult;

  const editingSlug = (formData.get("editingSlug") as string) || "";
  const title = ((formData.get("title") as string) || "").trim();
  const shortDescription = (
    (formData.get("shortDescription") as string) || ""
  ).trim();
  const longDescription = (
    (formData.get("longDescription") as string) || ""
  ).trim();
  const category = ((formData.get("category") as string) || "").trim();
  const hasFixedDate = formData.get("hasFixedDate") === "on";
  const dateRaw = ((formData.get("date") as string) || "").trim();
  const timeRaw = ((formData.get("time") as string) || "").trim();
  const priceRaw = ((formData.get("price") as string) || "").trim();
  const instructorRaw = ((formData.get("instructor") as string) || "").trim();
  const currentImage = (formData.get("currentImage") as string) || "";
  const imageFile = formData.get("image") as File | null;
  const highlights = formData
    .getAll("highlights[]")
    .map((h) => String(h).trim())
    .filter((h) => h.length > 0);

  if (!title || !shortDescription || !longDescription || !category) {
    return { error: "Bitte fülle alle erforderlichen Felder aus." };
  }

  let price: number | null = null;
  if (priceRaw) {
    price = Number(priceRaw.replace(",", "."));
    if (isNaN(price) || price < 0) {
      return { error: "Bitte gib einen gültigen Preis an." };
    }
  }

  if (hasFixedDate && !dateRaw) {
    return { error: "Bitte gib ein Datum für den Kurs an." };
  }

  try {
    const courses = await fetchCoursesFromGithub(config);
    if (courses === null) {
      return {
        error:
          "Die aktuelle Kursliste konnte nicht von GitHub geladen werden. Bitte versuche es erneut.",
      };
    }

    // Determine the slug: keep it stable when editing, generate when creating
    let slug = editingSlug;
    if (!slug) {
      const base = slugify(title);
      if (!base) {
        return {
          error: "Aus dem Titel konnte kein gültiger Slug erzeugt werden.",
        };
      }
      slug = uniqueSlug(
        base,
        courses.map((c) => c.slug),
      );
    } else if (!courses.some((c) => c.slug === editingSlug)) {
      return { error: "Der zu bearbeitende Kurs wurde nicht gefunden." };
    }

    // Handle the image: upload a new one or keep the current path
    let imagePath = currentImage;
    if (imageFile && imageFile.size > 0) {
      const uploadResult = await uploadCourseImage(imageFile, slug, config);
      if ("error" in uploadResult) return { error: uploadResult.error };
      imagePath = uploadResult.imagePath;

      // Clean up the previously uploaded image
      if (currentImage && currentImage !== imagePath) {
        await deleteCourseImage(currentImage, config);
      }
    }

    if (!imagePath) {
      return { error: "Bitte wähle ein Bild für den Kurs aus." };
    }

    const course: Course = {
      slug,
      title,
      shortDescription,
      longDescription,
      date: hasFixedDate && dateRaw ? dateRaw : null,
      time: timeRaw || null,
      price,
      image: imagePath,
      instructor: instructorRaw || null,
      hasFixedDate,
      category,
      highlights: highlights.length > 0 ? highlights : undefined,
    };

    const updatedCourses = upsertCourse(courses, course);
    const action = editingSlug ? "update" : "add";
    const pushSuccess = await pushCoursesToGithub(
      updatedCourses,
      `feat: ${action} course "${title}"`,
      config,
    );

    if (!pushSuccess) {
      return { error: "Fehler beim Aktualisieren der Kursdaten auf GitHub." };
    }

    return { success: true, course };
  } catch (error) {
    console.error("Error saving course:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      error: `Ein unerwarteter Fehler ist aufgetreten: ${errorMessage}`,
    };
  }
}

/**
 * Deletes a course (and its uploaded image) and pushes the updated
 * list to GitHub.
 */
export async function deleteCourse(slug: string) {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    return { error: "Nicht autorisiert. Bitte melde dich erneut an." };
  }

  const configResult = getGithubConfigOrError();
  if ("error" in configResult) return { error: configResult.error };
  const config = configResult;

  try {
    const courses = await fetchCoursesFromGithub(config);
    if (courses === null) {
      return {
        error:
          "Die aktuelle Kursliste konnte nicht von GitHub geladen werden. Bitte versuche es erneut.",
      };
    }

    const course = courses.find((c) => c.slug === slug);
    if (!course) {
      return { error: "Der Kurs wurde nicht gefunden." };
    }

    await deleteCourseImage(course.image, config);

    const updatedCourses = removeCourse(courses, slug);
    const pushSuccess = await pushCoursesToGithub(
      updatedCourses,
      `feat: remove course "${course.title}"`,
      config,
    );

    if (!pushSuccess) {
      return { error: "Fehler beim Aktualisieren der Kursdaten auf GitHub." };
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting course:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      error: `Ein unerwarteter Fehler ist aufgetreten: ${errorMessage}`,
    };
  }
}
