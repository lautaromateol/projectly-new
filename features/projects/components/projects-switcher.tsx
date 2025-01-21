import Link from "next/link";
import { Loader2 } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { WorkspaceAvatar } from "@/features/workspaces/components/workspace-avatar";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";

interface ProjectsSwitcherProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export function ProjectsSwitcher({ isOpen, setIsOpen }: ProjectsSwitcherProps) {

  const { projects, isLoadingProjects } = useGetProjects()

  if (isLoadingProjects) {
    return (
      <Loader2 className="size-8 animate-spin text-rose-600 mb-4 mx-auto" />
    )
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleContent className="space-y-0.5 mb-2">
        {projects?.map((project) => (
          <Link href={`/dashboard/${project.workspaceId}/projects/${project.id}`} key={project.id}>
            <div className="flex items-center gap-x-2 px-2 py-1 rounded-lg">
              <WorkspaceAvatar
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
