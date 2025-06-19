"use client";

import { Settings } from "lucide-react";
import { type Project } from "~/types";
import { Progress } from "~/components/ui/progress";
import { nameToPattern } from "~/lib/utils/nameToPatterns";
import Link from "next/link";
import { useAppDispatch } from "../../../lib/hooks/redux-hooks";
import { setSelectedProject } from "../../../lib/features/projects/projects-slice";

export default function ProjectCard({ project }: { project: Project }) {
  const bgPattern = nameToPattern(project.name);
  const dispatch = useAppDispatch();

  return (
    <Link
      className="border-accent m-5 flex h-1/3 w-2/7 min-w-[300px] flex-col overflow-hidden rounded border-2"
      href={`/dashboard/projects/${project.id}`}
      onClick={() =>
        dispatch(
          setSelectedProject({
            ...project,
            createdAt: project.createdAt
              ? new Date(project.createdAt).toISOString()
              : "",
            updatedAt: project.updatedAt
              ? new Date(project.updatedAt).toISOString()
              : "",
          }),
        )
      }
    >
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
          <Progress value={25} />
        </div>
      </div>
    </Link>
  );
}
