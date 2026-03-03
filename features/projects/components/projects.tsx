"use client"
import { useState } from "react";
import { ChevronDown, ChevronUp, PlusIcon } from "lucide-react";
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";
import { ProjectsSwitcher } from "./projects-switcher";

export function Projects() {
  const { open } = useCreateProjectModal();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between px-3 mb-1.5">
        <p className="text-xs uppercase text-slate-500 font-semibold tracking-wider">Projects</p>
        <div className="flex items-center gap-x-0.5">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="size-5 flex items-center justify-center rounded text-slate-500 hover:text-white hover:bg-slate-700 transition-colors"
            title={isOpen ? "Collapse" : "Expand"}
          >
            {isOpen ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
          </button>
          <button
            onClick={open}
            className="size-5 flex items-center justify-center rounded text-slate-500 hover:text-white hover:bg-slate-700 transition-colors"
            title="New project"
          >
            <PlusIcon className="size-3.5" />
          </button>
        </div>
      </div>
      <ProjectsSwitcher isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
