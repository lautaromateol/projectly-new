import { Loader2 } from "lucide-react"
import { useGetProject } from "@/features/projects/api/use-get-project"
import { useUpdateProjectModal } from "@/features/projects/hooks/use-update-project-modal"
import { ResponsiveModal } from "@/components/responsive-modal"
import { UpdateProjectForm } from "./update-project-form"

export function UpdateProjectFormWrapper() {

  const { project, isLoadingProject } = useGetProject()

  const { isOpen, close } = useUpdateProjectModal()

  return (
    <ResponsiveModal title="Update Project" open={isOpen} onOpenChange={close}>
      {isLoadingProject && (
        <div className="flex items-center justify-center w-full">
          <Loader2 className="size-8 animate-spin text-rose-600" />
        </div>
      )}
      {project && (
        <UpdateProjectForm project={project} />
      )}
    </ResponsiveModal>
  )
}
