"use client";

import { useActionState } from "react";
import { login } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: unknown, formData: FormData) => {
      const result = await login(formData);
      if (result?.success) {
        // Reload page to reflect authenticated state
        window.location.reload();
        return { success: true };
      }
      return { error: result?.error || "Ein Fehler ist aufgetreten." };
    },
    null,
  );

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="border-border bg-background w-full max-w-md space-y-8 rounded-2xl border p-8 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full">
            <Lock className="text-deep-black h-6 w-6" />
          </div>
          <h2 className="text-foreground mt-6 text-3xl font-bold tracking-tight">
            Admin-Bereich
          </h2>
          <p className="text-foreground/60 mt-2 text-sm">
            Bitte gib das Passwort ein, um das Event zu bearbeiten.
          </p>
        </div>

        <form action={formAction} className="mt-8 space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-foreground text-sm font-medium"
            >
              Passwort
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full"
            />
          </div>

          {state?.error && (
            <p className="text-destructive text-sm font-medium" role="alert">
              {state.error}
            </p>
          )}

          <Button
            type="submit"
            className="w-full cursor-pointer justify-center py-2 text-base font-semibold"
            disabled={isPending}
          >
            {isPending ? "Wird überprüft..." : "Anmelden"}
          </Button>
        </form>
      </div>
    </div>
  );
}
