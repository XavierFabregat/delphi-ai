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
import { useAppDispatch, useAppSelector } from "../../lib/hooks/redux-hooks";
import { setSelectedProject } from "../../lib/features/projects/projects-slice";

export default function BusinessCombobox({
  projects,
}: {
  projects: Project[];
}) {
  const dispatch = useAppDispatch();
  const project = useAppSelector((state) => state.projects);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(project.selectedProject?.name);
  const [id, setId] = React.useState(project.selectedProject?.id);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/projects/set-cookie", {
      method: "POST",
      body: JSON.stringify({ value: id }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        router.refresh();
      })
      .catch((err) => console.log(err));
    router.refresh();
  }, [id, router]);

  useEffect(() => {
    console.log("state change", project.selectedProject);
  }, [project.selectedProject]);

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
                      setValue(currentValue);
                      setId(
                        () =>
                          projects.find(
                            (project) => project.name === currentValue,
                          )?.id ?? "",
                      );
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
                      );
                      setOpen(false);
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
