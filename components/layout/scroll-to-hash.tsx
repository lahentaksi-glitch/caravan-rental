"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    const scroll = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;
      const el = document.getElementById(hash);
      if (!el) return;
      window.setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    };

    scroll();
    window.addEventListener("hashchange", scroll);
    return () => window.removeEventListener("hashchange", scroll);
  }, [pathname]);

  return null;
}
