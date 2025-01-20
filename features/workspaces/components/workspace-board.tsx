"use client"
import { InferResponseType } from "hono"
import { client } from "@/lib/client"
import { WorkspaceAvatar } from "./workspace-avatar"
import { useUser } from "@clerk/nextjs"

type Workspace = InferResponseType<typeof client.api.workspaces[":workspaceId"]["$get"], 200>["data"]

interface WorkspaceBoardProps {
  workspace: Workspace
}

export function WorskpaceBoard({ workspace }: WorkspaceBoardProps) {

  const { user } = useUser()

  return (
    <div className="flex items-center gap-x-4">
      <WorkspaceAvatar
        name={workspace.name}
        imageUrl={workspace.imageUrl ?? ""}
        className="size-12"
      />
      <div className="space-y-0">
        <p className="text-lg font-medium">{workspace.name}</p>
        <p className="text-sm text-muted-foreground font-medium">{user?.fullName} - {workspace.role}</p>
      </div>
    </div>
  )
}
