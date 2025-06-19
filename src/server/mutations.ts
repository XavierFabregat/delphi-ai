import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { businessIdeas, businessInputs, users } from "./db/schema";
import type { Project } from "../types";
import { eq } from "drizzle-orm";
import { openai } from "../lib/openai";

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

type ProjectData = {
  id: string;
  name?: string;
  concept?: string;
};

export async function updateProject(projectData: ProjectData) {
  const user = await auth();

  if (!user.userId) throw new Error("Unauthorized");

  const projectToUpdate = await db.query.businessIdeas.findFirst({
    where: (model, { eq, and }) =>
      and(eq(model.id, projectData.id), eq(model.userId, user.userId)),
  });

  if (!projectToUpdate) throw new Error("Could not find project.");

  const updatedProject = await db
    .update(businessIdeas)
    .set({
      ...projectData,
    })
    .where(eq(businessIdeas.id, projectToUpdate.id));

  return updatedProject;
}

export async function addProjectConcept(projectId: string, concept: string) {
  const user = await auth();

  if (!user.userId) throw new Error("Unauthorized");

  const projectToUpdate = await db.query.businessIdeas.findFirst({
    where: (model, { eq, and }) =>
      and(eq(model.id, projectId), eq(model.userId, user.userId)),
  });

  if (!projectToUpdate) throw new Error("Could not find project.");

  await db
    .update(businessIdeas)
    .set({
      concept,
    })
    .where(eq(businessIdeas.id, projectToUpdate.id));

  const messages = [
    {
      role: "system" as const,
      content:
        "You are a professional business consultant. Your goal is to ask relevant questions to clarify vague or incomplete business ideas so a proper viability, market, and financial report can be generated.",
    },
    {
      role: "user" as const,
      content: `
    A user submitted this business idea:
    
    "${concept}"
    
    Your job:
    1. Identify what key information is missing.
    2. Ask up to 6 clear, conversational questions grouped into:
      - Business Model & Viability
      - Market & Competition
      - Financials
    
    Respond ONLY with the grouped questions, like:
    {
      "Business Model & Viability": [...],
      "Market & Competition": [...],
      "Financials": [...]
    }
            `,
    },
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages,
    temperature: 0.7,
  });

  console.log(response.choices[0]?.message, response.choices[0], response);

  await db.insert(businessInputs).values({
    section: "concept",
    reportType: "viability",
    content: JSON.stringify([
      ...messages,
      { role: "system", content: response.choices[0]?.message },
    ]),
    businessIdeaId: projectId,
  });

  return response.choices[0]?.message;
}
