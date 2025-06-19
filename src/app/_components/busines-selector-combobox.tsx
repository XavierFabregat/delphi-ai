"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "~/lib/utils/cn";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { useMediaQuery } from "~/lib/hooks/use-media-query";
import { CommandSeparator } from "cmdk";
import { redirect, useRouter } from "next/navigation";
import { type Project } from "~/types";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "~/lib/hooks/redux-hooks";
import {
  selectActiveProject,
  setSelectedProject,
} from "~/lib/features/projects/projects-slice";

export default function BusinessCombobox({
  projects,
  selectedProject,
}: {
  projects: Project[];
  selectedProject: Project | undefined;
}) {
  const dispatch = useAppDispatch();
  const selectedProjectV2 = useAppSelector(selectActiveProject);
  const [open, setOpen] = React.useState(false);
  const value = selectedProjectV2?.name;
  const id = selectedProjectV2?.id;
  const router = useRouter();

  useEffect(() => {
    // If the selected project is already in Redux, do nothing
    if (selectedProjectV2) return;

    const cookie = document.cookie
      .split(";")
      .find((c) => c.trim().startsWith("selected_project="));

    const projectId = cookie?.split("=")[1];

    if (!projectId) return;

    const projectFromCookie = projects.find((proj) => proj.id === projectId);

    if (!projectFromCookie) return;

    dispatch(
      setSelectedProject({
        ...projectFromCookie,
        createdAt: projectFromCookie.createdAt?.toString() ?? "",
        updatedAt: projectFromCookie.updatedAt?.toString() ?? "",
      }),
    );
  }, [selectedProjectV2, projects, dispatch]);

  useEffect(() => {
    fetch("/api/projects/set-cookie", {
      method: "POST",
      body: JSON.stringify({ value: id }),
    })
      .then((res) => res.json())
      .then(() => {
        router.refresh();
      })
      .catch((err) => console.log(err));
    router.refresh();
    console.log(
      document.cookie
        .split(";")
        .find((cookie) => cookie.trim().startsWith("selected_project="))
        ?.split("=")[1],
    );
  }, [id, router]);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? projects.find((project) => project.name === value)?.name
              : "Select project..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Select project..." className="h-9" />
            <CommandList>
              <CommandEmpty>No project found.</CommandEmpty>
              <CommandGroup>
                {projects.map((project) => (
                  <CommandItem
                    key={project.id}
                    value={project.name}
                    onSelect={(currentValue) => {
                      const project = projects.find(
                        (project) => project.name === currentValue,
                      );
                      if (!project) return;
                      dispatch(
                        setSelectedProject({
                          ...project,
                          createdAt: project.createdAt?.toString() ?? "",
                          updatedAt: project.updatedAt?.toString() ?? "",
                        }),
                      );
                      setOpen(false);
                      router.replace(`/dashboard/projects/${project.id}`);
                    }}
                  >
                    {project.name}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === project.name ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator className="text-accent border-accent mx-auto my-2 w-9/10 border-[0.2]" />
              <CommandGroup>
                <CommandItem
                  value="create"
                  onSelect={() => {
                    setOpen(false);
                    redirect("/dashboard/projects/create");
                  }}
                >
                  <span className="text-xl">+</span>Create new project
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }

  // TODO: Implement mobile version using Drawer
  // return (
  //   <Drawer open={open} onOpenChange={setOpen}>
  //     <DrawerTrigger asChild>
  //       <Button
  //         variant="outline"
  //         role="combobox"
  //         aria-expanded={open}
  //         className="w-[200px] justify-between"
  //       >
  //         {value
  //           ? projects.find((project) => project.value === value)?.label
  //           : "Select project..."}
  //         <ChevronsUpDown className="opacity-50" />
  //       </Button>
  //     </DrawerTrigger>
  //     <DrawerContent className="w-[200px] p-0">
  //       <Command>
  //         <CommandInput placeholder="Select project..." className="h-9" />
  //         <CommandList>
  //           <CommandEmpty>No project found.</CommandEmpty>
  //           <CommandGroup>
  //             {projects.map((project) => (
  //               <CommandItem
  //                 key={project.value}
  //                 value={project.value}
  //                 onSelect={(currentValue) => {
  //                   setValue(currentValue === value ? "" : currentValue);
  //                   setOpen(false);
  //                 }}
  //               >
  //                 {project.label}
  //                 <Check
  //                   className={cn(
  //                     "ml-auto",
  //                     value === project.value ? "opacity-100" : "opacity-0",
  //                   )}
  //                 />
  //               </CommandItem>
  //             ))}
  //           </CommandGroup>
  //         </CommandList>
  //       </Command>
  //     </DrawerContent>
  //   </Drawer>
  // );
}
