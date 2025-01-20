import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { JoinWorkspace } from "./components/join-workspace"

interface JoinWorkspacePageProps {
  params: {
    workspaceId: string,
    inviteCode: string
  }
}

export default async function JoinWorkspacePage({ params }: JoinWorkspacePageProps) {

  const { workspaceId, inviteCode } = await params

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
