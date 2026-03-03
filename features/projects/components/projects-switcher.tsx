"use client"
import Link from "next/link";
import { Loader2 } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useProjectId } from "@/features/projects/hooks/use-project-id";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { ProjectAvatar } from "./project-avatar";
import { cn } from "@/lib/utils";

interface ProjectsSwitcherProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function ProjectsSwitcher({ isOpen, setIsOpen }: ProjectsSwitcherProps) {
  const { projects, isLoadingProjects } = useGetProjects();
  const projectId = useProjectId();

  if (isLoadingProjects) {
    return (
      <div className="flex items-center justify-center py-3">
        <Loader2 className="size-4 animate-spin text-slate-500" />
      </div>
    );
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleContent className="space-y-0.5">
        {projects?.map((project) => (
          <Link href={`/dashboard/${project.workspaceId}/projects/${project.id}`} key={project.id}>
            <div
              className={cn(
                "flex items-center gap-x-2.5 px-3 py-2 rounded-md transition-colors",
                projectId === project.id
                  ? "bg-slate-700 text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              )}
            >
              <ProjectAvatar
                name={project.name}
                imageUrl={project.imageUrl ?? ""}
                className="size-5 shrink-0"
              />
              <span className="text-sm font-medium truncate">{project.name}</span>
            </div>
          </Link>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
