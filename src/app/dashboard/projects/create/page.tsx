import { Button } from "~/components/ui/button";
import { createProject } from "~/server/mutations";
import { Input } from "~/components/ui/input";

export default function CreateProject() {
  return (
    <div className="flex h-full w-full items-center justify-around">
      <div className="flex h-1/2 w-1/2 flex-col items-center justify-center">
        <div className="from-foreground to-accent bg-linear-to-r bg-clip-text text-5xl leading-20 font-bold text-transparent">
          Let&apos;s get you started!
        </div>
        <form
          action={async (data: FormData) => {
            "use server";
            const projectName = data.get("project-name") as string;
            await createProject(projectName);
          }}
          className="flex h-full w-4/5 items-center justify-around"
        >
          <Input
            placeholder="Project name"
            id="project-name"
            className="border-accent h-1/10 w-2/3 resize-none border border-1 text-center !text-xl"
            name="project-name"
          />
          <Button
            type="submit"
            className="bg-accent hover:bg-primary my-10 h-1/10"
            size={"lg"}
          >
            Crate project
          </Button>
        </form>
      </div>
    </div>
  );
}
