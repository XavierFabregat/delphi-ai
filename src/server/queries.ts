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

export async function getProjectById(id: string) {
  const user = await auth();

  if (!user.userId) throw new Error("Unauthorized");

  const project = await db.query.businessIdeas.findFirst({
    where: (model, { eq, and }) =>
      and(eq(model.id, id), eq(model.userId, user.userId)),
    orderBy: (model, { desc }) => desc(model.createdAt),
  });

  return project;
}
