"use client"
import { Settings, User } from "lucide-react";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useOpenWorkspaceSettingsModal } from "@/features/settings/hooks/use-open-workspace-settings-modal";
import { useOpenWorkspaceMembersModal } from "@/features/members/hooks/use-open-workspace-members-modal";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { WorkspaceAvatar } from "./workspace-avatar";
import { WorskpaceBoard } from "./workspace-board";

export function WorkspaceDropdown() {

  const workspaceId = useWorkspaceId()
  const { workspace, isLoadingWorkspace } = useGetWorkspace({ workspaceId })
  const { open } = useOpenWorkspaceSettingsModal()
  const { open: openMembers } = useOpenWorkspaceMembersModal()

  if (isLoadingWorkspace || !workspace) {
    return (
      null
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-x-2">
          <WorkspaceAvatar
            name={workspace.name}
            imageUrl={workspace.imageUrl ?? ""}
            className="size-8"
          />
          <p className="font-medium text-sm">{workspace.name}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-4">
        <DropdownMenuItem>
          <WorskpaceBoard workspace={workspace} />
        </DropdownMenuItem>
        <DropdownMenuSeparator className="w-full" />
        <DropdownMenuItem onClick={open} className="cursor-pointer">
            <div className="flex items-center gap-x-2">
              <Settings className="size-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground font-medium">Settings</p>
            </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="w-full" />
        <DropdownMenuItem onClick={openMembers} className="cursor-pointer">
            <div className="flex items-center gap-x-2">
              <User className="size-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground font-medium">Members</p>
            </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
