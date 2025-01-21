/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"

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
    <div>Page</div>
  )
}
