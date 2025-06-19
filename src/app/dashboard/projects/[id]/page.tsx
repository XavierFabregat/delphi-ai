import { getProjectById } from "~/server/queries";

export default async function Project({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);
  console.log(project);

  if (!project)
    return (
      <div>
        There seems to be some error, we haven&apos;t found the project.
      </div>
    );

  if (!project.concept) {
    return (
      <div className="h-full w-full bg-blue-900 p-20">
        <h1 className="text-2xl font-semibold">{project.name}</h1>
        <p>We haven&apos;t set up the project yet, let&apos;s start!</p>
      </div>
    );
  }

  return <div>{project.name}</div>;
}
