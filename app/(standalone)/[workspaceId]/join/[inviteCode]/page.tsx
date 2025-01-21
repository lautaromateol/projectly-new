import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { JoinWorkspace } from "./components/join-workspace"

interface JoinWorkspacePageProps {
  params: Record<string, string>
}


export default async function JoinWorkspacePage({ params }: JoinWorkspacePageProps) {

  const workspaceId = params.workspaceId as string
  const inviteCode = params.inviteCode as string

  const workspace = await prisma.workspace.findFirst({
    where: {
      id: workspaceId
    }
  })

  if (!workspace) {
    notFound()
  }

  if (workspace.inviteCode !== inviteCode) {
    throw new Error("Invalid Invite Code.")
  }
  
  return (
    <JoinWorkspace workspace={workspace} />
  )
}
