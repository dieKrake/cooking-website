import { describe, it, expect } from "vitest";
import { existsSync } from "fs";
import path from "path";
import coursesData from "./courses.json";
import latestEvent from "./latest-event.json";

// Browsers and the Next.js image optimizer can render these formats.
// HEIC/HEIF (iPhone default) is NOT supported and must never end up here.
const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];

const PUBLIC_DIR = path.resolve(__dirname, "../../public");

function assertValidImagePath(imagePath: string) {
  expect(imagePath, `image path "${imagePath}"`).toMatch(/^\/images\//);

  const extension = imagePath.split(".").pop()?.toLowerCase() ?? "";
  expect(
    ALLOWED_EXTENSIONS,
    `"${imagePath}" has unsupported extension ".${extension}"`,
  ).toContain(extension);

  expect(
    existsSync(path.join(PUBLIC_DIR, imagePath)),
    `"${imagePath}" does not exist in public/`,
  ).toBe(true);
}

describe("courses.json", () => {
  it("has unique slugs", () => {
    const slugs = coursesData.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it.each(coursesData.map((c) => [c.slug, c.image] as const))(
    'course "%s" references an existing, browser-renderable image',
    (_slug, image) => {
      assertValidImagePath(image);
    },
  );
});

describe("latest-event.json", () => {
  it("references an existing, browser-renderable image", () => {
    assertValidImagePath(latestEvent.imagePath);
  });
});
