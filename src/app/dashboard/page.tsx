import { getMyProjects } from "~/server/queries";
import ProjectCard from "./_components/project-card";

export default async function Dashboard() {
  const projects = await getMyProjects();

  return (
    <div className="relative flex h-full w-full items-start justify-center">
      <div className="flex h-full w-3/4 flex-wrap items-center justify-center overflow-y-scroll">
        {[...projects, ...projects].map((project, index) => (
          <ProjectCard project={project} key={project.id + "" + index} />
        ))}
      </div>
      <div className="border-foreground h-full w-1/4 border-l">Rest</div>
    </div>
  );
}
