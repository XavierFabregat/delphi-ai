import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { businessIdeas, users } from "./db/schema";

export async function createProject(name: string) {
  const user = await auth();

  if (!user.userId) throw new Error("Unauthorized");

  const newProject = await db.insert(businessIdeas).values({
    name,
    userId: user.userId,
  });

  return newProject;
}

export async function syncUser(userData: { id: string; email: string }) {
  const newUser = await db.insert(users).values(userData);
  return newUser;
}
