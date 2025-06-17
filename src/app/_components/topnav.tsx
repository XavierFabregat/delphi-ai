import { SignedOut, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./mode-toggle";
import { Button } from "~/components/ui/button";
import { SidebarTrigger } from "../../components/ui/sidebar";
import SlashSeparator from "./slash-separator";
import BusinessCombobox from "./busines-selector-combobox";

export default function TopNav() {
  return (
    <nav className="bg-background border-foreground z-20 flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div className="flex items-center gap-2">
        <div>
          <SidebarTrigger />
        </div>
        <div>DelphiAI</div>
        <SlashSeparator />
        <BusinessCombobox />
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
