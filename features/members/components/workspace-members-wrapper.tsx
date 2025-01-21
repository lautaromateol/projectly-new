import { useOpenWorkspaceMembersModal } from "@/features/members/hooks/use-open-workspace-members-modal";
import { ResponsiveModal } from "@/components/responsive-modal";
import { WorkspaceMembers } from "./workspace-members";

export function WorkspaceMembersWrapper() {

  const { isOpen, close } = useOpenWorkspaceMembersModal()

  return (
    <ResponsiveModal title="Workspace Members" open={isOpen} onOpenChange={close} className="max-w-screen-xl min-h-96 flex flex-col items-start">
      <WorkspaceMembers />
    </ResponsiveModal>
  )
}
