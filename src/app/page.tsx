import { SignInButton } from "@clerk/nextjs";
import { Button } from "../components/ui/button";
import LottiePlayer from "./_components/lottie-player";
import animationData from "~/animations/hero-animation.json";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  // if user is signed in, redirect to dashboard
  const user = await auth();
  if (user.userId) {
    redirect("/dashboard");
  }
  return (
    <div className="bg-background h-full w-full">
      <div className="space-between my-20 flex h-[70vh] w-full items-center justify-around rounded-lg p-10">
        <div className="flex h-full flex-col justify-around gap-10">
          <div className="bg-accent flex flex-col items-start justify-center rounded-lg p-20">
            <p>
              <span className="text-background text-4xl">DelphiAI</span>
            </p>
            <p>
              <span className="text-background/50 text-xl">
                The AI Workspace that Thinks With You.
              </span>
            </p>
          </div>
          <div className="flex w-full items-center justify-around">
            <SignInButton forceRedirectUrl={"/dashboard"}>
              <Button
                className="bg-accent text-background from-accent/40 to-background/40 text-xl hover:bg-gradient-to-b"
                size="lg"
              >
                Get Started
              </Button>
            </SignInButton>
          </div>
        </div>
        <div>
          <LottiePlayer animationData={animationData} size={50} />
        </div>
      </div>
    </div>
  );
}
