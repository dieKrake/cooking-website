import { checkAuth } from "./actions";
import { LoginForm } from "./login-form";
import { EventForm } from "./event-form";
import eventData from "@/lib/latest-event.json";

export const metadata = {
  title: "Admin-Bereich | Event bearbeiten",
  description: "Verwalte das aktuelle Highlight-Event auf der Startseite.",
};

// Force dynamic rendering since we are checking cookies on the server
export const dynamic = "force-dynamic";

export default async function AdminEventPage() {
  const isAuthenticated = await checkAuth();

  return (
    <main className="min-h-screen bg-background py-10">
      {isAuthenticated ? (
        <EventForm initialData={eventData} />
      ) : (
        <LoginForm />
      )}
    </main>
  );
}
