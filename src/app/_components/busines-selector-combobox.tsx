"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "~/lib/utils";
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
import { useMediaQuery } from "~/hooks/use-media-query";
import { Drawer, DrawerContent, DrawerTrigger } from "~/components/ui/drawer";
import { CommandSeparator } from "cmdk";

const projects = [
  {
    value: "delphi-ai",
    label: "Delphi AI",
  },
  {
    value: "cheesecake-chic",
    label: "Cheesecake Chic",
  },
  {
    value: "thing-in",
    label: "Thing In",
  },
];

export default function BusinessCombobox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

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
              ? projects.find((project) => project.value === value)?.label
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
                    key={project.value}
                    value={project.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {project.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === project.value ? "opacity-100" : "opacity-0",
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
                    setValue("");
                    setOpen(false);
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
