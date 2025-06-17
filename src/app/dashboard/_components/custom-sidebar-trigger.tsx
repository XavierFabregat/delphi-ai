"use client";

import { useSidebar } from "~/components/ui/sidebar";
import { Button } from "~/components/ui/button";
import { ChevronLeftSquare } from "lucide-react";

export default function CustomSidebarTrigger() {
  const { toggleSidebar, state } = useSidebar();

  return (
    <Button
      onClick={toggleSidebar}
      className={`hover:text-accent flex items-center justify-center rounded-full border-0 bg-transparent p-2 text-white hover:bg-transparent ${
        state === "expanded" ? "hover-bounce-left" : "hover-bounce-right"
      }`}
    >
      {state === "expanded" ? (
        <ChevronLeftSquare className="size-xl" size={26} />
      ) : (
        <ChevronLeftSquare className="size-xl rotate-180" size={26} />
      )}
    </Button>
  );
}
