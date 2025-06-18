import { NextResponse } from "next/server";
import { getMyProjects } from "../../../server/queries";

export async function GET() {
  try {
    const projects = await getMyProjects();
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
