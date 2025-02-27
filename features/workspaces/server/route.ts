import { Hono } from "hono";
import { Client, ID, Storage } from "node-appwrite"
import { zValidator } from "@hono/zod-validator"
import { createWorkspaceSchema, updateWorskspaceSchema } from "@/features/workspaces/schemas";
import { prisma } from "@/lib/prisma";
import { generateInviteCode } from "@/lib/utils";
import { sessionMiddleware } from "@/lib/session-middleware";

const app = new Hono()
  .use("*", sessionMiddleware)
  .get("/",
    async (c) => {
      const { id } = c.get("user")

      const workspaces = await prisma.workspace.findMany({
        where: {
          members: {
            some: {
              userId: {
                equals: id
              }
            }
          }
        }
      })

      return c.json({ data: workspaces }, 200)
    }
  )
  .post("/",
    zValidator("form", createWorkspaceSchema, (result, c) => {
      if (!result.success) {
        return c.json({ message: "Invalid data." }, 400)
      }
    }),
    async (c) => {
      const { id, fullName, hasImage, imageUrl: userImage } = c.get("user")
      const { name, imageUrl } = c.req.valid("form")

      const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)

      const storage = new Storage(client)

      let uploadedImageUrl: string | undefined

      if (imageUrl instanceof File) {
        const file = await storage.createFile(
          process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
          ID.unique(),
          imageUrl
        )

        const arrayBuffer = await storage.getFilePreview(
          process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
          file.$id
        )

        uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`
      }

      const workspace = await prisma.workspace.create({
        data: {
          name,
          imageUrl: uploadedImageUrl,
          inviteCode: generateInviteCode(10)
        }
      })

      await prisma.member.create({
        data: {
          userId: id,
          role: "ADMIN",
          workspaceId: workspace.id,
          name: fullName!,
          imageUrl: hasImage ? userImage : null
        },
      })

      return c.json({ data: workspace }, 200)
    })
  .get("/:workspaceId",
    async (c) => {
      const { id } = c.get("user")
      const { workspaceId } = c.req.param()

      const workspace = await prisma.workspace.findUnique({
        where: {
          id: workspaceId,
          members: {
            some: {
              userId: {
                equals: id
              }
            }
          }
        },
        include: {
          members: true
        }
      })

      const member = await prisma.member.findFirst({
        where: {
          workspaceId,
          userId: id
        },
        select: {
          role: true
        }
      })

      if (!workspace || !member) {
        return c.json({ message: "Workspace not found." }, 404)
      }

      return c.json({ data: { ...workspace, role: member.role } }, 200)
    }
  )
  .patch("/:workspaceId",
    zValidator("form", updateWorskspaceSchema, (result, c) => {
      if (!result.success) {
        return c.json({ message: "Invalid data." }, 400)
      }
    }),
    async (c) => {
      const { id } = c.get("user")
      const { workspaceId } = c.req.param()
      const { name, imageUrl } = c.req.valid("form")

      const member = await prisma.member.findFirst({
        where: {
          userId: id,
          workspaceId
        }
      })

      if (!member || member.role !== "ADMIN") {
        return c.json({ message: "Unauthorized." }, 401)
      }

      const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)

      const storage = new Storage(client)

      let uploadedImageUrl: string | undefined

      if (imageUrl instanceof File) {
        const file = await storage.createFile(
          process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
          ID.unique(),
          imageUrl
        )

        const arrayBuffer = await storage.getFilePreview(
          process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
          file.$id
        )

        uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`
      } else {
        uploadedImageUrl = imageUrl
      }


      const workspace = await prisma.workspace.update({
        where: {
          id: workspaceId
        },
        data: {
          name,
          imageUrl: uploadedImageUrl
        }
      })

      return c.json({ data: workspace }, 200)
    }
  )
  .patch("/join/:inviteCode",
    async (c) => {
      const { id, fullName, hasImage, imageUrl: userImage } = c.get("user")
      const { inviteCode } = c.req.param()

      const workspace = await prisma.workspace.findFirst({
        where: {
          inviteCode
        }
      })

      if (!workspace) {
        return c.json({ message: "Invalid invite code." }, 401)
      }

      await prisma.member.create({
        data: {
          userId: id,
          workspaceId: workspace.id,
          role: "MEMBER",
          name: fullName!,
          imageUrl: hasImage ? userImage : null
        }
      })

      return c.json({ data: workspace }, 200)
    }
  )
  .delete("/:workspaceId",
    async (c) => {
      const { id } = c.get("user")
      const { workspaceId } = c.req.param()

      const member = await prisma.member.findFirst({
        where: {
          workspaceId,
          userId: id
        }
      })

      if (!member || member.role !== "ADMIN") {
        return c.json({ message: "Unauthorized." }, 401)
      }

      const workspace = await prisma.workspace.delete({
        where: {
          id: workspaceId
        }
      })

      return c.json({ data: workspace }, 200)
    }
  )

export default app