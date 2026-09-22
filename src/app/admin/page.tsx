import { checkAuth } from "./lib/auth";
import { LoginForm } from "./login-form";
import { AdminTabs } from "./admin-tabs";
import eventData from "@/lib/latest-event.json";
import coursesData from "@/lib/courses.json";
import type { Course } from "@/types";

export const metadata = {
  title: "Admin-Bereich | Culina",
  description: "Verwalte Events und Kurse der Culina-Website.",
};

// Force dynamic rendering since we are checking cookies on the server
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const isAuthenticated = await checkAuth();

  return (
    <main className="min-h-screen bg-background py-10">
      {isAuthenticated ? (
        <AdminTabs eventData={eventData} courses={coursesData as Course[]} />
      ) : (
        <LoginForm />
      )}
    </main>
  );
}
