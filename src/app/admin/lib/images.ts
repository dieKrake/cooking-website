/**
 * Shared image upload validation for the admin area (client + server).
 *
 * Only formats that browsers and the Next.js image optimizer can render
 * are allowed. HEIC/HEIF (the iPhone default) is explicitly rejected,
 * because sharp on Vercel cannot decode it and the image would end up
 * broken on the live site.
 */

export const MAX_IMAGE_SIZE = 4 * 1024 * 1024;

/** Maps allowed file extensions (lowercase) to the canonical extension used for storage. */
const ALLOWED_EXTENSIONS: Record<string, string> = {
  jpg: "jpg",
  jpeg: "jpg",
  png: "png",
  webp: "webp",
};

const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export const ACCEPTED_IMAGE_TYPES = Array.from(ALLOWED_MIME_TYPES).join(",");

export const IMAGE_FORMAT_HINT = "Maximal 4 MB (JPG, PNG oder WebP)";

export const IMAGE_SIZE_ERROR = "Das Bild darf maximal 4 MB groß sein.";

export const IMAGE_FORMAT_ERROR =
  "Dieses Bildformat wird nicht unterstützt. Bitte lade das Bild als JPG, PNG oder WebP hoch. " +
  "Tipp für iPhone-Fotos (HEIC): Einstellungen → Kamera → Formate → „Maximale Kompatibilität“ " +
  "oder das Foto vorher in JPG umwandeln.";

export type ImageValidationResult =
  | { ok: true; extension: string }
  | { ok: false; error: string };

/**
 * Validates size, file extension and (if provided by the browser) MIME type.
 * Returns the canonical extension to use for the stored file.
 */
export function validateImageFile(file: {
  name: string;
  size: number;
  type: string;
}): ImageValidationResult {
  if (file.size > MAX_IMAGE_SIZE) {
    return { ok: false, error: IMAGE_SIZE_ERROR };
  }

  const rawExtension = file.name.includes(".")
    ? file.name.split(".").pop()!.toLowerCase()
    : "";
  const extension = ALLOWED_EXTENSIONS[rawExtension];
  if (!extension) {
    return { ok: false, error: IMAGE_FORMAT_ERROR };
  }

  // Browsers sometimes leave the MIME type empty (e.g. for HEIC on Windows);
  // if it is set, it has to match the allowlist as well.
  if (file.type && !ALLOWED_MIME_TYPES.has(file.type)) {
    return { ok: false, error: IMAGE_FORMAT_ERROR };
  }

  return { ok: true, extension };
}
