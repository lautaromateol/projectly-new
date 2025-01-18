import { UseCreateWorkspace } from "@/features/workspaces/hooks/use-create-workspace"
import { ResponsiveModal } from "@/components/responsive-modal"
import { CreateWorkspaceForm } from "./create-workspace-form"

export function CreateWorkspaceFormWrapper() {

  const { isOpen, close } = UseCreateWorkspace()

  return (
    <ResponsiveModal title="Create a new Workspace" open={isOpen} onOpenChange={close}>
      <CreateWorkspaceForm />
    </ResponsiveModal>
  )
}
