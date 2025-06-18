import { Settings } from "lucide-react";
import { type Project } from "~/types";
import { Progress } from "~/components/ui/progress";
import { nameToPattern } from "~/lib/utils/nameToPatterns";

export default function ProjectCard({ project }: { project: Project }) {
  const bgPattern = nameToPattern(project.name);

  return (
    <div className="border-accent m-5 flex h-1/3 w-2/7 min-w-[300px] flex-col overflow-hidden rounded border-2">
      <div
        className={`border-accent bg-accent h-1/3 w-full border-b ${bgPattern} mask-[length:80px_80px] mask-repeat`}
      ></div>
      <div className="w-full flex-1 p-5">
        <div className="my-5 flex w-full items-center justify-between">
          <div className="">
            <h1 className="text-xl font-semibold">{project.name}</h1>
            <p className="text-muted-foreground">0/3 reports generated</p>
          </div>
          <div>
            <Settings />
          </div>
        </div>
        <div className="mt-10">
          <Progress value={(Math.round(Math.random() * 8) / 8) * 100} />
        </div>
      </div>
    </div>
  );
}
