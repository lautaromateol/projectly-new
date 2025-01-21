/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { JoinWorkspace } from "./components/join-workspace"

export default async function JoinWorkspacePage({ params }: any) {

  const { workspaceId } = await params

  const workspace = await prisma.workspace.findFirst({
    where: {
      id: workspaceId as string
    }
  })

  if (!workspace) {
    notFound()
  }

  return (
    <JoinWorkspace workspace={workspace} />
  )
}
