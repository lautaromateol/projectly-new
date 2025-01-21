import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { JoinWorkspace } from "./components/join-workspace"

interface JoinWorkspacePageProps {
  params: {
    workspaceId: string
  }
}


export default async function JoinWorkspacePage({ params }: JoinWorkspacePageProps) {

  const { workspaceId } = params

  const workspace = await prisma.workspace.findFirst({
    where: {
      id: workspaceId
    }
  })

  if (!workspace) {
    notFound()
  }

  return (
    <JoinWorkspace workspace={workspace} />
  )
}
