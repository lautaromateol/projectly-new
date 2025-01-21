import { Hono } from "hono";
import { prisma } from "@/lib/prisma";
import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { Role } from "@prisma/client/edge";

const app = new Hono()
  .use("*", sessionMiddleware)
  .get("/:workspaceId",
    async (c) => {
      const { workspaceId } = c.req.param()

      const members = await prisma.member.findMany({
        where: {
          workspaceId
        }
      })

      return c.json({ data: members }, 200)
    })
  .patch("/:memberId",
    zValidator("json", z.object({
      role: z.nativeEnum(Role)
    }), (result, c) => {
      if(!result.success) {
        return c.json({ message: "Invalid data." }, 400)
      }
    }),
    async (c) => {
      const { role } = c.req.valid("json")
      const { memberId } = c.req.param()

      const { id } = c.get("user")

      const member = await prisma.member.findFirst({
        where: {
          userId: id
        }
      })

      if(!member || member.role !== "ADMIN") {
        return c.json({ message: "Unauthorized" }, 401)
      }

      const memberToUpdate = await prisma.member.update({
        where: {
          id: memberId,
        },
        data: {
          role
        }
      })

      return c.json({ data: memberToUpdate }, 200)
    }
  )
  .delete("/:memberId",
    async (c) => {
      const { memberId } = c.req.param()

      const { id } = c.get("user")

      const member = await prisma.member.findFirst({
        where: {
          userId: id
        }
      })

      if(!member || member.role !== "ADMIN") {
        return c.json({ message: "Unauthorized" }, 401)
      }

      const memberToDelete = await prisma.member.delete({
        where: {
          id: memberId,
        }
      })

      return c.json({ data: memberToDelete }, 200)
    }
  )

export default app