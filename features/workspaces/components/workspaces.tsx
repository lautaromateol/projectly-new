"use client"
import { PlusIcon } from "lucide-react";
import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/use-create-workspace";
import { Button } from "@/components/ui/button";
import { WorkspacesSwitcher } from "./worskpaces-switcher";

export function Workspaces() {

  const { open } = useCreateWorkspaceModal()

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <p className="text-sm uppercase text-rose-600 font-medium antialiased">Workspaces</p>
        <Button onClick={open} size="icon" variant="ghost">
          <PlusIcon className="size-4" />
        </Button>
      </div>
      <WorkspacesSwitcher />
    </div>
  )
}
