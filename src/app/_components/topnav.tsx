import { SignedOut, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./mode-toggle";

export default function TopNav() {
  return (
    <nav className="bg-background border-foreground flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>DelphiAI</div>
      <div>
        <div className="flex flex-row items-center gap-4 px-5">
          <ModeToggle />
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
