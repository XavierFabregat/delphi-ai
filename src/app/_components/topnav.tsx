import { SignedOut, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./mode-toggle";
import { Button } from "~/components/ui/button";
import SlashSeparator from "./slash-separator";
import BusinessCombobox from "./busines-selector-combobox";
import { getMyProjects } from "../../server/queries";

export default async function TopNav() {
  const projects = await getMyProjects();

  return (
    <nav className="bg-background border-foreground z-20 flex w-full items-center justify-between border-b p-4 px-10 text-xl font-semibold">
      <div className="flex items-center gap-2">
        <div>DelphiAI</div>
        <SlashSeparator />
        <BusinessCombobox projects={projects} />
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
