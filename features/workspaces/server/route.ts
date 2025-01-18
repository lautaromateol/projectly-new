import { Hono } from "hono";
import { Client, ID, Storage } from "node-appwrite"
import { auth } from "@clerk/nextjs/server";
import { zValidator } from "@hono/zod-validator"
import { createWorkspaceSchema } from "@/features/workspaces/schemas";
import { prisma } from "@/lib/prisma";
import { generateInviteCode } from "@/lib/utils";

const app = new Hono()
  .post("/",
    zValidator("form", createWorkspaceSchema, (result, c) => {
      if (!result.success) {
        return c.json({ message: "Invalid data." }, 400)
      }
    }),
    async (c) => {
      const { userId } = await auth()
      const { name, imageUrl } = c.req.valid("form")

      if (!userId) {
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
          userId,
          role: "ADMIN",
          workspaceId: workspace.id
        }
      })

      return c.json({ data: workspace }, 200)
    })

export default app