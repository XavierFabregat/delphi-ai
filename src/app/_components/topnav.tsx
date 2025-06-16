import { SignedOut, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";

export default function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b bg-purple-900 p-4 text-xl font-semibold">
      <div>Gallery</div>
      <div>
        <div className="flex flex-row items-center gap-4">
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
