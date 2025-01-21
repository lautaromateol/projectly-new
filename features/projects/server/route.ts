import { Hono } from "hono";
import { Client, ID, Storage } from "node-appwrite"
import { zValidator } from "@hono/zod-validator"
import { createProjectSchema, updateWorskspaceSchema } from "@/features/projects/schemas";
import { prisma } from "@/lib/prisma";
import { sessionMiddleware } from "@/lib/session-middleware";
import { z } from "zod";

const app = new Hono()
  .use("*", sessionMiddleware)
  .get("/",
    zValidator("query", z.object({ workspaceId: z.string() }), (result, c) => {
      if (!result.success) {
        return c.json({ message: "Invalid data." }, 400)
      }
    }),
    async (c) => {
      const { id } = c.get("user")
      const { workspaceId } = c.req.valid("query")

      const member = await prisma.member.findFirst({
        where: {
          workspaceId: {
            equals: workspaceId
          },
          userId: {
            equals: id
          }
        }
      })

      if (!member) {
        return c.json({ message: "Unauthorized." }, 401)
      }

      const projects = await prisma.project.findMany({
        where: {
          workspaceId: {
            equals: workspaceId
          }
        }
      })

      return c.json({ data: projects }, 200)
    }
  )
  .post("/:workspaceId",
    zValidator("form", createProjectSchema, (result, c) => {
      if (!result.success) {
        return c.json({ message: "Invalid data." }, 400)
      }
    }),
    async (c) => {
      const { name, imageUrl } = c.req.valid("form")
      const { id } = c.get("user")
      const { workspaceId } = c.req.param()

      const member = await prisma.member.findFirst({
        where: {
          workspaceId: {
            equals: workspaceId
          },
          userId: {
            equals: id
          }
        }
      })

      if (!member) {
        return c.json({ message: "Unauthorized" }, 401)
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

      const project = await prisma.project.create({
        data: {
          name,
          imageUrl: uploadedImageUrl,
          workspaceId
        }
      })

      return c.json({ data: project }, 200)
    })
  .get("/:projectId",
    zValidator("query", z.object({ workspaceId: z.string() }), (result, c) => {
      if (!result.success) {
        return c.json({ message: "Invalid data." }, 400)
      }
    }),
    async (c) => {
      const { id } = c.get("user")
      const { projectId } = c.req.param()
      const { workspaceId } = c.req.valid("query")

      const member = await prisma.member.findFirst({
        where: {
          workspaceId: {
            equals: workspaceId
          },
          userId: {
            equals: id
          }
        },
      })

      if (!member) {
        return c.json({ message: "Unauthorized" }, 401)
      }

      const project = await prisma.project.findUnique({
        where: {
          id: projectId
        }
      })

      if (!project) {
        return c.json({ message: "Project not found." }, 404)
      }

      return c.json({ data: project }, 200)
    }
  )
  .patch("/:projectId",
    zValidator("form", updateWorskspaceSchema, (result, c) => {
      if (!result.success) {
        return c.json({ message: "Invalid data." }, 400)
      }
    }),
    zValidator("query", z.object({ workspaceId: z.string() })),
    async (c) => {
      const { name, imageUrl } = c.req.valid("form")
      const { workspaceId } = c.req.valid("query")
      const { id } = c.get("user")
      const { projectId } = c.req.param()

      const member = await prisma.member.findFirst({
        where: {
          workspaceId: {
            equals: workspaceId
          },
          userId: {
            equals: id
          }
        }
      })

      if (!member) {
        return c.json({ message: "Unauthorized" }, 401)
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


      const project = await prisma.project.update({
        where: {
          id: projectId
        },
        data: {
          name,
          imageUrl: uploadedImageUrl
        }
      })

      return c.json({ data: project }, 200)
    }
  )
  .delete("/:projectId",
    zValidator("query", z.object({ workspaceId: z.string() })),
    async (c) => {
      const { id } = c.get("user")
      const { projectId } = c.req.param()
      const { workspaceId } = c.req.valid("query")

      const member = await prisma.member.findFirst({
        where: {
          workspaceId: {
            equals: workspaceId
          },
          userId: {
            equals: id
          }
        }
      })

      if (!member) {
        return c.json({ message: "Unauthorized." }, 401)
      }

      const project = await prisma.project.delete({
        where: {
          id: projectId
        }
      })

      return c.json({ data: project }, 200)
    }
  )

export default app