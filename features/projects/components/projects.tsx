"use client"
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";
import { Button } from "@/components/ui/button";
import { ProjectsSwitcher } from "./projects-switcher";

export function Projects() {

  const { open } = useCreateProjectModal()

  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <p className="text-sm uppercase text-rose-600 font-medium antialiased">Projects</p>
        <Button size="icon" variant="ghost" onClick={() => setIsOpen((prev) => !prev)}>
          {isOpen ? (
            <ChevronUp className="size-4" />
          ) : (
            <ChevronDown className="size-4" />
          )}
        </Button>
      </div>
      <ProjectsSwitcher isOpen={isOpen} setIsOpen={setIsOpen} />
      <Button className="w-full" onClick={open}>
        Create Project
      </Button>
    </div >
  )
}
