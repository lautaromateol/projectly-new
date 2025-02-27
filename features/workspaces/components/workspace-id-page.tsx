"use client"
import { notFound } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { Separator } from "@/components/ui/separator";
import { WorkspaceAvatar } from "./workspace-avatar";
import { WorkspaceProjects } from "./workspace-projects";
import { WorkspaceMembers } from "./workspace-members";

export function WorkspaceIdPage() {

  const { workspace, isLoadingWorkspace } = useGetWorkspace()

  if (isLoadingWorkspace) {
    return <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="size-16 animate-spin text-rose-600" />
    </div>
  }

  if (!workspace) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <WorkspaceAvatar
            name={workspace.name}
            imageUrl={workspace.imageUrl ?? ""}
            className="size-10"
          />
          <p className="text-xl font-semibold">{workspace.name}</p>
        </div>
        <WorkspaceMembers members={workspace.members} />
      </div>
      <Separator className="w-full mx-auto" />
      <WorkspaceProjects />
    </div>
  )
}
