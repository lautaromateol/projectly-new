import { prisma } from "@/lib/prisma";
import { sessionMiddleware } from "@/lib/session-middleware";
import { Hono } from "hono";

const app = new Hono()
  .use("*", sessionMiddleware)
  .get("/:taskId",
    async (c) => {
      const { taskId } = c.req.param()

      const activityLogs = await prisma.activityLog.findMany({
        where: {
          taskId
        },
        include: {
          member: {
            select: {
              name: true,
              imageUrl: true
            }
          },
          task: {
            select: {
              name: true
            }
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      })

      return c.json({ data: activityLogs }, 200)
    }
  )
  .get("/project/:projectId",
    async (c) => {
      const { projectId } = c.req.param()

      const activityLogs = await prisma.activityLog.findMany({
        where: {
          task: {
            projectId: {
              equals: projectId
            }
          }
        },
        include: {
          member: {
            select: {
              name: true,
              imageUrl: true
            }
          },
          task: {
            select: {
              name: true
            }
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      })

      return c.json({ data: activityLogs }, 200)
    }
  )

export default app