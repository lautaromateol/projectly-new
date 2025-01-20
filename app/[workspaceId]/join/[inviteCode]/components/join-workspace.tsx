"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useJoinWorkspace } from "@/features/workspaces/api/use-join-workspace"
import { WorkspaceAvatar } from "@/features/workspaces/components/workspace-avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Workspace } from "@prisma/client/edge"

interface JoinWorkspaceProps {
  workspace: Workspace
}

export function JoinWorkspace({ workspace }: JoinWorkspaceProps) {

  const router = useRouter()

  const { joinWorkspace, isJoiningWorkspace } = useJoinWorkspace()

  function handleJoinWorkspace() {
    joinWorkspace({
      param: { inviteCode: workspace.inviteCode }
    }, {
      onSuccess: () => {
        router.push(`/dashboard/${workspace.id}`)
      }
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Join Workspace</CardTitle>
          <CardDescription>Accept the invitation to join this workspace.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-x-2">
            <WorkspaceAvatar
              name={workspace.name}
              imageUrl={workspace.imageUrl ?? ""}
              className="size-10"
            />
            <div className="space-y-0">
              <p className="text-sm font-semibold">{workspace.name}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex items-center gap-x-2">
            <Button
              disabled={isJoiningWorkspace}
              variant="outline"
            >
              <Link href="/dashboard">
                Cancel
              </Link>
            </Button>
            <Button
              disabled={isJoiningWorkspace}
              onClick={handleJoinWorkspace}
            >
              Accept
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
