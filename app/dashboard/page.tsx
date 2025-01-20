import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function Page() {

  const { userId } = await auth()

  const workspaces = await prisma.workspace.findMany({
    where: {
      members: {
        some: {
          userId: {
            equals: userId!
          }
        }
      }
    }
  })

  if(workspaces.length === 0) {
    redirect("/create-workspace")
  } else {
    redirect(`/dashboard/${workspaces[0].id}`)
  }
}
