import { SignedOut, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./mode-toggle";
import { Button } from "~/components/ui/button";

export default function TopNav() {
  return (
    <nav className="bg-background border-foreground flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>DelphiAI</div>
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
