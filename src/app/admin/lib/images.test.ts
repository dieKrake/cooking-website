import { describe, it, expect } from "vitest";
import {
  validateImageFile,
  MAX_IMAGE_SIZE,
  IMAGE_SIZE_ERROR,
  IMAGE_FORMAT_ERROR,
  ACCEPTED_IMAGE_TYPES,
} from "./images";

const file = (name: string, type = "", size = 1024) => ({ name, type, size });

describe("validateImageFile", () => {
  it("accepts jpg, png and webp", () => {
    expect(validateImageFile(file("a.jpg", "image/jpeg"))).toEqual({
      ok: true,
      extension: "jpg",
    });
    expect(validateImageFile(file("a.png", "image/png"))).toEqual({
      ok: true,
      extension: "png",
    });
    expect(validateImageFile(file("a.webp", "image/webp"))).toEqual({
      ok: true,
      extension: "webp",
    });
  });

  it("normalizes uppercase and jpeg extensions", () => {
    expect(validateImageFile(file("IMG_0001.JPG", "image/jpeg"))).toEqual({
      ok: true,
      extension: "jpg",
    });
    expect(validateImageFile(file("photo.jpeg", "image/jpeg"))).toEqual({
      ok: true,
      extension: "jpg",
    });
  });

  it("rejects HEIC/HEIF regardless of MIME type or casing", () => {
    expect(validateImageFile(file("IMG_0001.HEIC", "image/heic"))).toEqual({
      ok: false,
      error: IMAGE_FORMAT_ERROR,
    });
    expect(validateImageFile(file("IMG_0001.heic", ""))).toEqual({
      ok: false,
      error: IMAGE_FORMAT_ERROR,
    });
    expect(validateImageFile(file("IMG_0001.heif", "image/heif"))).toEqual({
      ok: false,
      error: IMAGE_FORMAT_ERROR,
    });
  });

  it("rejects files without an extension or with other formats", () => {
    expect(validateImageFile(file("blob", "image/jpeg")).ok).toBe(false);
    expect(validateImageFile(file("a.gif", "image/gif")).ok).toBe(false);
    expect(validateImageFile(file("a.svg", "image/svg+xml")).ok).toBe(false);
    expect(validateImageFile(file("a.pdf", "application/pdf")).ok).toBe(false);
  });

  it("rejects an allowed extension when the MIME type contradicts it", () => {
    expect(validateImageFile(file("fake.jpg", "image/heic"))).toEqual({
      ok: false,
      error: IMAGE_FORMAT_ERROR,
    });
  });

  it("accepts an allowed extension when the browser leaves the MIME type empty", () => {
    expect(validateImageFile(file("a.png", ""))).toEqual({
      ok: true,
      extension: "png",
    });
  });

  it("rejects files larger than 4 MB", () => {
    expect(
      validateImageFile(file("a.jpg", "image/jpeg", MAX_IMAGE_SIZE + 1)),
    ).toEqual({ ok: false, error: IMAGE_SIZE_ERROR });
    expect(validateImageFile(file("a.jpg", "image/jpeg", MAX_IMAGE_SIZE)).ok).toBe(
      true,
    );
  });

  it("exposes the accept attribute value for file inputs", () => {
    expect(ACCEPTED_IMAGE_TYPES).toBe("image/jpeg,image/png,image/webp");
  });
});
