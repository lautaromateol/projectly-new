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
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export function ProjectsSwitcher({ isOpen, setIsOpen }: ProjectsSwitcherProps) {

  const { projects, isLoadingProjects } = useGetProjects()

  const projectId = useProjectId()

  if (isLoadingProjects) {
    return (
      <Loader2 className="size-8 animate-spin text-rose-600 mb-4 mx-auto" />
    )
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleContent className="flex flex-col gap-y-1.5 mb-2">
        {projects?.map((project) => (
          <Link href={`/dashboard/${project.workspaceId}/projects/${project.id}`} key={project.id}>
            <div className={cn(
              "flex items-center gap-x-2 p-2 rounded-lg hover:shadow hover:bg-rose-100/50",
              projectId === project.id ? "shadow bg-rose-100/50" : ""
            )}>
              <ProjectAvatar
                name={project.name}
                imageUrl={project.imageUrl ?? ""}
              />
              <p className="text-sm font-medium">{project.name}</p>
            </div>
          </Link>
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}
