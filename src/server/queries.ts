import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";

export async function getMyProjects() {
  const user = await auth();

  if (!user.userId) throw new Error("Unauthorized");

  const projects = await db.query.businessIdeas.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.createdAt),
  });

  return projects;
}
