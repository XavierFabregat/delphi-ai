import { SignedOut, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./mode-toggle";
import { Button } from "~/components/ui/button";
import SlashSeparator from "./slash-separator";
import BusinessCombobox from "./busines-selector-combobox";
import { getMyProjects } from "~/server/queries";
import { cookies } from "next/headers";
import { auth } from "@clerk/nextjs/server";
import type { Project } from "../../types";

export default async function TopNav() {
  const { userId } = await auth(); // ✅ Check auth context on server

  let projects: Project[] = [];
  let selectedProject = undefined;

  if (userId) {
    projects = await getMyProjects();
    const selectedProjectId = (await cookies()).get("selected_project")?.value;
    selectedProject = projects.find((proj) => proj.id === selectedProjectId);
  }
  return (
    <nav className="bg-background border-foreground z-20 flex w-full items-center justify-between border-b p-4 px-10 text-xl font-semibold">
      <div className="flex items-center gap-2">
        <div>DelphiAI</div>
        <SignedIn>
          <SlashSeparator />
          <BusinessCombobox
            projects={projects}
            selectedProject={selectedProject}
          />
        </SignedIn>
      </div>
      <div>
        <div className="flex flex-row items-center gap-4 px-5">
          <ModeToggle />
          <SignedOut>
            <SignInButton>
              <Button className="bg-accent text-background hover:bg-accent-foreground hover:text-accent">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
