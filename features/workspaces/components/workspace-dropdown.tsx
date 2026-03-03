"use client"
import { ChevronDown, Settings, Users } from "lucide-react";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useOpenWorkspaceSettingsModal } from "@/features/settings/hooks/use-open-workspace-settings-modal";
import { useOpenWorkspaceMembersModal } from "@/features/members/hooks/use-open-workspace-members-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WorkspaceAvatar } from "./workspace-avatar";
import { WorskpaceBoard } from "./workspace-board";

export function WorkspaceDropdown() {
  const { workspace, isLoadingWorkspace } = useGetWorkspace();
  const { open } = useOpenWorkspaceSettingsModal();
  const { open: openMembers } = useOpenWorkspaceMembersModal();

  if (isLoadingWorkspace || !workspace) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-x-2 pl-3 pr-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none">
          <WorkspaceAvatar
            name={workspace.name}
            imageUrl={workspace.imageUrl ?? ""}
            className="size-7"
          />
          <span className="font-semibold text-sm text-slate-700 max-w-[140px] truncate">
            {workspace.name}
          </span>
          <ChevronDown className="size-3.5 text-slate-400 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 p-2 shadow-lg">
        <DropdownMenuItem
          className="p-2 rounded-lg focus:bg-slate-50 cursor-default"
          onSelect={(e) => e.preventDefault()}
        >
          <WorskpaceBoard workspace={workspace} />
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-1" />
        <DropdownMenuItem
          onClick={open}
          className="flex items-center gap-x-2.5 px-2.5 py-2 cursor-pointer rounded-md"
        >
          <Settings className="size-4 text-slate-400 shrink-0" />
          <span className="text-sm text-slate-600 font-medium">Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={openMembers}
          className="flex items-center gap-x-2.5 px-2.5 py-2 cursor-pointer rounded-md"
        >
          <Users className="size-4 text-slate-400 shrink-0" />
          <span className="text-sm text-slate-600 font-medium">Members</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
