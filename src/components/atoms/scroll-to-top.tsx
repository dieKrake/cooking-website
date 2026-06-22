"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Wenn die Route wechselt, scrollen wir sofort und ohne Verzögerung nach oben.
    // Wir deaktivieren kurzzeitig das smooth-scrolling auf dem html-Element,
    // damit der Sprung wirklich sofort (instant) erfolgt und nicht hängen bleibt.
    const html = document.documentElement;
    const originalScrollBehavior = html.style.scrollBehavior;
    
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    
    // Nach einem minimalen Timeout stellen wir das ursprüngliche Verhalten (für Hash-Links etc.) wieder her
    const timer = setTimeout(() => {
      html.style.scrollBehavior = originalScrollBehavior;
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
