"use client";

import { useState, startTransition } from "react";
import { logout } from "./lib/auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarHeart, ChefHat, LogOut } from "lucide-react";
import { EventForm } from "./event/event-form";
import { CoursesManager } from "./kurse/courses-manager";
import type { Course } from "@/types";

interface AdminTabsProps {
  eventData: {
    title: string;
    description: string;
    date: string;
    imagePath: string;
    visible?: boolean;
  };
  courses: Course[];
}

const TABS = [
  { id: "event", label: "Event", icon: CalendarHeart },
  { id: "kurse", label: "Kurse", icon: ChefHat },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function AdminTabs({ eventData, courses }: AdminTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("event");

  const handleLogout = () => {
    startTransition(() => {
      logout();
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div className="border-border flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-foreground text-3xl font-bold tracking-tight">
            Admin-Bereich
          </h1>
          <p className="text-foreground/60 mt-1 text-sm">
            Verwalte hier das Highlight-Event und die Kochkurse der Website.
          </p>
        </div>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="border-destructive/20 text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer gap-2"
        >
          <LogOut className="h-4 w-4" />
          Abmelden
        </Button>
      </div>

      <div
        role="tablist"
        aria-label="Admin-Bereiche"
        className="border-border mt-6 flex gap-2 border-b"
      >
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            role="tab"
            aria-selected={activeTab === id}
            onClick={() => setActiveTab(id)}
            className={cn(
              "-mb-px inline-flex cursor-pointer items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors",
              activeTab === id
                ? "border-primary text-foreground"
                : "text-foreground/50 hover:text-foreground border-transparent",
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="mt-2">
        {activeTab === "event" ? (
          <EventForm initialData={eventData} />
        ) : (
          <CoursesManager initialCourses={courses} />
        )}
      </div>
    </div>
  );
}
