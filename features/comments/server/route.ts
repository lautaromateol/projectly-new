import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createCommentSchema, updateCommentSchema } from "@/features/comments/schemas";
import { sessionMiddleware } from "@/lib/session-middleware";
import { prisma } from "@/lib/prisma";

const app = new Hono()
  .use("*", sessionMiddleware)
  .get("/:taskId",
    async (c) => {
      const { taskId } = c.req.param()

      const comments = await prisma.comment.findMany({
        where: {
          taskId: {
            equals: taskId
          }
        },
        include: {
          member: {
            select: {
              name: true,
              imageUrl: true
            }
          }
        }
      })

      return c.json({ data: comments }, 200)
    }
  )
  .post("/:taskId",
    zValidator("query", z.object({ workspaceId: z.string() }), (result, c) => {
      if (!result.success) {
        return c.json({ message: "Invalid data." }, 400)
      }
    }),
    zValidator("json", createCommentSchema, (result, c) => {
      if (!result.success) {
        return c.json({ message: "Invalid data." }, 400)
      }
    }),
    async (c) => {
      const { content } = c.req.valid("json")
      const { workspaceId } = c.req.valid("query")
      const { taskId } = c.req.param()
      const { id } = c.get("user")

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

      const comment = await prisma.comment.create({
        data: {
          content,
          taskId,
          memberId: member.id
        }
      })

      return c.json({ data: comment }, 200)
    }
  )
  .patch("/:commentId",
    zValidator("query", z.object({ workspaceId: z.string() }), (result, c) => {
      if (!result.success) {
        return c.json({ message: "Invalid data." }, 400)
      }
    }),
    zValidator("json", updateCommentSchema, (result, c) => {
      if (!result.success) {
        return c.json({ message: "Invalid data." }, 400)
      }
    }),
    async (c) => {
      const { content } = c.req.valid("json")
      const { workspaceId } = c.req.valid("query")
      const { commentId } = c.req.param()
      const { id } = c.get("user")

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

      const comment = await prisma.comment.update({
        where: {
          id: commentId
        },
        data: {
          content
        }
      })

      return c.json({ data: comment }, 200)
    }
  )
  .delete("/:commentId",
    zValidator("query", z.object({ workspaceId: z.string() }), (result, c) => {
      if (!result.success) {
        return c.json({ message: "Invalid data." }, 400)
      }
    }),
    async (c) => {
      const { workspaceId } = c.req.valid("query")
      const { commentId } = c.req.param()
      const { id } = c.get("user")

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

      const comment = await prisma.comment.delete({
        where: {
          id: commentId
        }
      })

      return c.json({ data: comment }, 200)
    }
  )

export default app