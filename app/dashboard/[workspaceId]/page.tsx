/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@clerk/nextjs/server"
import { WorkspaceIdPage } from "@/features/workspaces/components/workspace-id-page"
import { prisma } from "@/lib/prisma"

export default async function Page({ params }: any) {

  const { workspaceId } = await params

  const { userId } = await auth()

  const member = await prisma.member.findFirst({
    where: {
      userId: userId!,
      workspaceId: workspaceId as string
    }
  })

  if (!member) {
    throw new Error("Unauthorized.")
  }

  return (
    <WorkspaceIdPage />
  )
}
