import { useOpenWorkspaceSettingsModal } from "@/features/settings/hooks/use-open-workspace-settings-modal";
import { ResponsiveModal } from "@/components/responsive-modal";
import { WorkspaceSettings } from "./workspace-settings";

export function WorkspaceSettingsWrapper() {

  const { isOpen, close } = useOpenWorkspaceSettingsModal()

  return (
    <ResponsiveModal title="Workspace Settings" open={isOpen} onOpenChange={close} className="max-w-screen-xl">
      <WorkspaceSettings />
    </ResponsiveModal>
  )
}
