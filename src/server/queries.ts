import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { businessIdeas } from "./db/schema";

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
  });

  return project;
}

export async function getMyBusinessInputsByProject(projectId: string) {
  const user = await auth();

  if (!user.userId) throw new Error("Unauthorized");

  // We make sure the project belongs that user!
  const projectToQuery = await db.query.businessIdeas.findFirst({
    where: (model, { eq, and }) =>
      and(eq(model.id, projectId), eq(model.userId, user.userId)),
  });

  if (!projectToQuery)
    throw new Error(`Could not find project with id ${projectId}.`);

  const businessInputs = await db.query.businessInputs.findMany({
    where: (model, { eq }) => eq(model.businessIdeaId, projectToQuery.id),
    orderBy: (model, { desc }) => desc(model.updatedAt), // last updated first
  });

  return businessInputs;
}
