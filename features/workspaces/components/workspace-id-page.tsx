"use client"
import { notFound } from "next/navigation";
import { Loader2, FolderKanban } from "lucide-react";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { WorkspaceAvatar } from "./workspace-avatar";
import { WorkspaceProjects } from "./workspace-projects";
import { WorkspaceMembers } from "./workspace-members";

export function WorkspaceIdPage() {
  const { workspace, isLoadingWorkspace } = useGetWorkspace();

  if (isLoadingWorkspace) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="size-8 animate-spin text-rose-600" />
      </div>
    );
  }

  if (!workspace) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {/* Workspace header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <WorkspaceAvatar
            name={workspace.name}
            imageUrl={workspace.imageUrl ?? ""}
            className="size-12 text-xl"
          />
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{workspace.name}</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              {workspace.members.length} member{workspace.members.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <WorkspaceMembers members={workspace.members} />
      </div>

      {/* Projects section */}
      <div className="space-y-4">
        <div className="flex items-center gap-x-2.5">
          <FolderKanban className="size-4 text-slate-400" />
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Projects</h2>
        </div>
        <WorkspaceProjects />
      </div>
    </div>
  );
}
