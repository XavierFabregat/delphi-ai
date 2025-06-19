// app/(dashboard)/_components/clear-cookie-trigger.tsx
"use client";

import { useEffect } from "react";
import { clearSelectedProject } from "~/server/actions";

export default function ClearCookieTrigger() {
  useEffect(() => {
    clearSelectedProject().catch((err) => console.log(err));
  }, []);

  return null;
}
