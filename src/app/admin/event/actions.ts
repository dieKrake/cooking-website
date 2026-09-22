"use server";

import { checkAuth } from "../lib/auth";
import { getEnvConfig, pushToGithub, deleteFromGithub } from "../lib/github";

const DEFAULT_IMAGE_PATH = "/images/latest-event.webp";

/**
 * Primary server action to handle the event form submission.
 * It validates inputs, reads the uploaded image, and pushes the changes to GitHub.
 */
export async function updateEvent(_prevState: unknown, formData: FormData) {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    return { error: "Nicht autorisiert. Bitte melde dich erneut an." };
  }

  const { githubToken, githubRepo, githubBranch } = getEnvConfig();

  if (!githubToken || !githubRepo) {
    return {
      error:
        "GitHub API-Konfiguration (GITHUB_PAT, GITHUB_REPO) fehlt auf dem Server.",
    };
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const date = formData.get("date") as string;
  const imageFile = formData.get("image") as File | null;
  const visible = formData.get("visible") === "on";
  const currentImagePath =
    (formData.get("currentImagePath") as string) || DEFAULT_IMAGE_PATH;

  if (!title || !description || !date) {
    return { error: "Bitte fülle alle erforderlichen Textfelder aus." };
  }

  try {
    let imagePath = currentImagePath; // Preserves the existing image unless a new one is uploaded below

    // If a new image was uploaded, commit it first
    if (imageFile && imageFile.size > 0) {
      // Validate file size (max 4MB)
      if (imageFile.size > 4 * 1024 * 1024) {
        return { error: "Das Bild darf maximal 4 MB groß sein." };
      }

      // Convert to webp if possible, or preserve original extension
      const extension = imageFile.name.split(".").pop() || "webp";
      const timestamp = Date.now();
      const targetImagePath = `public/images/events/latest-event-${timestamp}.${extension}`;
      imagePath = `/images/events/latest-event-${timestamp}.${extension}`;

      // Convert image file to base64
      const imageBuffer = await imageFile.arrayBuffer();
      const imageBase64 = Buffer.from(imageBuffer).toString("base64");

      // Push image to GitHub
      const imgPushSuccess = await pushToGithub(
        targetImagePath,
        imageBase64,
        `media: upload new event image [skip ci]`,
        githubToken,
        githubRepo,
        githubBranch,
      );

      if (!imgPushSuccess) {
        return { error: "Fehler beim Hochladen des Bildes auf GitHub." };
      }

      // Clean up the previously uploaded image (never the default image).
      // Failures are only logged since orphaned files do not break the site.
      if (
        currentImagePath.startsWith("/images/events/") &&
        currentImagePath !== imagePath
      ) {
        await deleteFromGithub(
          `public${currentImagePath}`,
          `media: remove old event image [skip ci]`,
          githubToken,
          githubRepo,
          githubBranch,
        );
      }
    }

    // 2. Prepare JSON data
    const eventJson = {
      title,
      description,
      date,
      imagePath,
      visible,
    };

    const jsonString = JSON.stringify(eventJson, null, 2);
    const jsonBase64 = Buffer.from(jsonString).toString("base64");

    // 3. Push JSON to GitHub (this commit will NOT skip CI, triggering Vercel build)
    const jsonPushSuccess = await pushToGithub(
      "src/lib/latest-event.json",
      jsonBase64,
      `feat: update latest event data to "${title}"`,
      githubToken,
      githubRepo,
      githubBranch,
    );

    if (!jsonPushSuccess) {
      return { error: "Fehler beim Aktualisieren der Event-Daten auf GitHub." };
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating event:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      error: `Ein unerwarteter Fehler ist aufgetreten: ${errorMessage}`,
    };
  }
}
