import { redirect } from "next/navigation";

// The admin area now lives at /admin (dashboard with tabs).
// Keep this route as a redirect for existing bookmarks.
export default function AdminEventPage() {
  redirect("/admin");
}
