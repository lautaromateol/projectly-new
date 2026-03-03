"use client"
import Link from "next/link";
import { useGetWorskpaces } from "@/features/workspaces/api/use-get-workspaces";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { Skeleton } from "@/components/ui/skeleton";
import { WorkspaceAvatar } from "./workspace-avatar";
import { cn } from "@/lib/utils";

export function WorkspacesSwitcher() {
  const { workspaces, isLoadingWorskpaces } = useGetWorskpaces();
  const workspaceId = useWorkspaceId();

  if (isLoadingWorskpaces) {
    return (
      <div className="space-y-1">
        <Skeleton className="h-8 w-full bg-slate-800" />
        <Skeleton className="h-8 w-full bg-slate-800" />
      </div>
    );
  }

  return (
    <div className="space-y-0.5">
      {workspaces?.map((workspace) => (
        <Link href={`/dashboard/${workspace.id}`} key={workspace.id}>
          <div
            className={cn(
              "flex items-center gap-x-2.5 px-3 py-2 rounded-md transition-colors",
              workspaceId === workspace.id
                ? "bg-slate-700 text-white"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            )}
          >
            <WorkspaceAvatar
              name={workspace.name}
              imageUrl={workspace.imageUrl ?? ""}
              className="size-5 shrink-0"
            />
            <span className="text-sm font-medium truncate">{workspace.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
