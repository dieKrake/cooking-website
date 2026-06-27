"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Environment variables configuration helper
function getEnvConfig() {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const githubToken = process.env.GITHUB_PAT;
  const githubRepo = process.env.GITHUB_REPO;
  const githubBranch = process.env.GITHUB_BRANCH || "develop";

  return { adminPassword, githubToken, githubRepo, githubBranch };
}

/**
 * Authenticates the admin user using a simple password comparison
 * and saves the session in an HTTP-only, secure cookie.
 */
export async function login(formData: FormData) {
  const password = formData.get("password") as string;
  const { adminPassword } = getEnvConfig();

  if (!adminPassword) {
    return {
      error: "ADMIN_PASSWORD ist nicht in den Umgebungsvariablen konfiguriert.",
    };
  }

  if (password === adminPassword) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", password, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });
    return { success: true };
  }

  return { error: "Ungültiges Passwort." };
}

/**
 * Logs the admin out by deleting the session cookie.
 */
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/event");
}

/**
 * Checks if the current request is authenticated.
 */
export async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  const { adminPassword } = getEnvConfig();

  return !!adminPassword && session === adminPassword;
}

/**
 * Fetches the SHA of an existing file in the GitHub repo to allow updates.
 */
async function getFileSha(
  path: string,
  token: string,
  repo: string,
  branch: string,
): Promise<string | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${repo}/contents/${path}?ref=${branch}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Culina-Event-Uploader",
        },
        cache: "no-store",
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data.sha;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching SHA for ${path}:`, error);
    return null;
  }
}

/**
 * Pushes/updates a file in the GitHub repository.
 */
async function pushToGithub(
  path: string,
  contentBase64: string,
  message: string,
  token: string,
  repo: string,
  branch: string,
): Promise<boolean> {
  const sha = await getFileSha(path, token, repo, branch);

  const body: {
    message: string;
    content: string;
    branch: string;
    sha?: string;
  } = {
    message,
    content: contentBase64,
    branch,
  };

  if (sha) {
    body.sha = sha;
  }

  const response = await fetch(
    `https://api.github.com/repos/${repo}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
        "User-Agent": "Culina-Event-Uploader",
      },
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) {
    const errText = await response.text();
    console.error(`Failed to push ${path} to GitHub:`, errText);
    return false;
  }

  return true;
}

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

  if (!title || !description || !date) {
    return { error: "Bitte fülle alle erforderlichen Textfelder aus." };
  }

  try {
    let imagePath = "/images/latest-event.webp"; // Default fallback/preserves existing if no new image uploaded

    // If a new image was uploaded, commit it first
    if (imageFile && imageFile.size > 0) {
      // Validate file size (max 4MB)
      if (imageFile.size > 4 * 1024 * 1024) {
        return { error: "Das Bild darf maximal 4 MB groß sein." };
      }

      // Convert to webp if possible, or preserve original extension
      const extension = imageFile.name.split(".").pop() || "webp";
      const targetImagePath = `public/images/events/latest-event-${Date.now()}.${extension}`;
      imagePath = `/images/events/latest-event-${Date.now()}.${extension}`;

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
    }

    // 2. Prepare JSON data
    const eventJson = {
      title,
      description,
      date,
      imagePath,
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
