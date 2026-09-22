"use server";

import { createHmac, timingSafeEqual, createHash } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getEnvConfig } from "./github";

const SESSION_COOKIE = "admin_session";
const SESSION_PAYLOAD = "culina-admin-session-v1";

/**
 * Derives the session token from the admin password. The token is an
 * HMAC signature, so the password itself is never stored in the cookie.
 */
function deriveSessionToken(adminPassword: string): string {
  return createHmac("sha256", adminPassword)
    .update(SESSION_PAYLOAD)
    .digest("hex");
}

/**
 * Timing-safe comparison of two strings (hashed first to equalize length).
 */
function safeEqual(a: string, b: string): boolean {
  const hashA = createHash("sha256").update(a).digest();
  const hashB = createHash("sha256").update(b).digest();
  return timingSafeEqual(hashA, hashB);
}

/**
 * Authenticates the admin user using a timing-safe password comparison
 * and saves a derived session token in an HTTP-only, secure cookie.
 */
export async function login(formData: FormData) {
  const password = formData.get("password") as string;
  const { adminPassword } = getEnvConfig();

  if (!adminPassword) {
    return {
      error: "ADMIN_PASSWORD ist nicht in den Umgebungsvariablen konfiguriert.",
    };
  }

  if (password && safeEqual(password, adminPassword)) {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, deriveSessionToken(adminPassword), {
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
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin");
}

/**
 * Checks if the current request is authenticated.
 */
export async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE)?.value;
  const { adminPassword } = getEnvConfig();

  if (!adminPassword || !session) return false;
  return safeEqual(session, deriveSessionToken(adminPassword));
}
