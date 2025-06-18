// app/api/set-cookie/route.ts
import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  // const res = NextResponse.next();
  const body = (await req.json()) as { value: string };

  (await cookies()).set("selected_project", body.value, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({ success: true });
}
