import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal"
import { ResponsiveModal } from "@/components/responsive-modal"
import { CreateProjectForm } from "./create-project-form"

export function CreateProjectFormWrapper() {

  const { isOpen, close } = useCreateProjectModal()

  return (
    <ResponsiveModal title="Create a new Project" open={isOpen} onOpenChange={close}>
      <CreateProjectForm />
    </ResponsiveModal>
  )
}
