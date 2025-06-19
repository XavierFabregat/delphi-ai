import { getMyBusinessInputsByProject, getProjectById } from "~/server/queries";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { addProjectConcept, updateProject } from "~/server/mutations";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default async function Project({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);
  const businessInputs = await getMyBusinessInputsByProject(id);

  if (!project)
    return (
      <div className="text-muted-foreground flex h-screen w-full items-center justify-center text-lg">
        There seems to be some error — we haven&apos;t found the project.
      </div>
    );

  if (!project.concept) {
    return (
      <div className="bg-background flex h-screen w-full items-center justify-center px-6 py-12">
        <div className="border-border bg-card w-full max-w-2xl rounded-2xl border p-8 shadow-lg">
          <h1 className="text-foreground mb-2 text-3xl font-bold">
            {project.name}
          </h1>
          <p className="text-muted-foreground mb-6">
            Let’s set up your business concept to begin ideation.
          </p>

          <form
            action={async (data: FormData) => {
              "use server";
              const concept = data.get("concept") as string;
              await addProjectConcept(id, concept);
              revalidatePath(`/dashboard/projects/${id}`);
            }}
            className="space-y-6"
          >
            <Textarea
              placeholder="Describe your business concept. For example: 'An AI assistant that helps dog owners train their pets more effectively.'"
              id="concept"
              name="concept"
              className="focus-visible:ring-accent min-h-[150px] resize-none text-base focus-visible:ring-2"
              autoFocus
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-accent text-background hover:bg-primary"
                size="lg"
              >
                Save and Continue
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="text-foreground flex h-screen w-full flex-col px-10 py-10">
      <div className="mb-6">
        <p className="text-2xl font-semibold">
          <span className="mr-2">🍾</span>
          Congratulations, your project is ready to take off!
          <span className="ml-2">🚀</span>
        </p>
        <p className="text-muted-foreground text-base font-light">
          Let&apos;s get your reports underway.
        </p>
      </div>

      {/* 🧠 AI Threads Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">AI Agent Threads</h2>
        <ul className="space-y-2">
          {businessInputs.map((input) => (
            <li
              key={input.id}
              className="border-border hover:bg-muted flex justify-between rounded-lg border px-4 py-3 transition"
            >
              <div className="flex flex-col">
                <span className="font-semibold">{input.section}</span>
                <span className="text-muted-foreground text-sm">
                  Created {new Date(input.createdAt).toLocaleDateString()}
                </span>
              </div>
              <Link
                href={`/dashboard/projects/${id}/inputs/${input.id}`}
                className="text-accent hover:underline"
              >
                Open →
              </Link>
            </li>
          ))}
          {businessInputs.length === 0 && (
            <li className="text-muted-foreground">
              No threads yet. Start a new one below.
            </li>
          )}
        </ul>

        {/* Optional: Add new thread button */}
        <Button
          className="bg-accent hover:bg-primary text-background mt-4 w-fit"
          size="sm"
          asChild
        >
          <Link href={`/dashboard/projects/${id}/threads/create`}>
            + Start New Report
          </Link>
        </Button>
      </div>
    </div>
  );
}
