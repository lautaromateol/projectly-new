"use client"
import { PlusIcon } from "lucide-react";
import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/use-create-workspace";
import { WorkspacesSwitcher } from "./worskpaces-switcher";

export function Workspaces() {
  const { open } = useCreateWorkspaceModal();

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between px-3 mb-1.5">
        <p className="text-xs uppercase text-slate-500 font-semibold tracking-wider">Workspaces</p>
        <button
          onClick={open}
          className="size-5 flex items-center justify-center rounded text-slate-500 hover:text-white hover:bg-slate-700 transition-colors"
          title="New workspace"
        >
          <PlusIcon className="size-3.5" />
        </button>
      </div>
      <WorkspacesSwitcher />
    </div>
  );
}
