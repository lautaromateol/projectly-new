import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator"
import { createTaskSchema, updateTaskSchema } from "@/features/tasks/schemas";
import { sessionMiddleware } from "@/lib/session-middleware";
import { prisma } from "@/lib/prisma";

const app = new Hono()
  .use("*", sessionMiddleware)
  .get("/",
    zValidator("query", z.object({ projectId: z.string() }), (result, c) => {
      if (!result.success) {
        return c.json({ message: "Invalid data." }, 400)
      }
    }),
    async (c) => {
      const { id } = c.get("user")
      const { projectId } = c.req.valid("query")

      const member = await prisma.member.findFirst({
        where: {
          workspace: {
            projects: {
              some: {
                id: {
                  equals: projectId
                }
              }
            }
          },
          userId: {
            equals: id
          }
        },
      })

      if (!member) {
        return c.json({ message: "Unauthorized." }, 401)
      }

      const tasks = await prisma.task.findMany({
        where: {
          projectId: {
            equals: projectId
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

      return c.json({ data: tasks }, 200)
    }
  )
  .post("/:projectId",
    zValidator("json", createTaskSchema, (result, c) => {
      if (!result.success) {
        return c.json({ message: "Invalid data." }, 400)
      }
    }),
    async (c) => {
      const { name, description, dueDate, priority, status, memberId } = c.req.valid("json")
      const { id } = c.get("user")
      const { projectId } = c.req.param()

      const member = await prisma.member.findFirst({
        where: {
          workspace: {
            projects: {
              some: {
                id: {
                  equals: projectId
                }
              }
            }
          },
          userId: {
            equals: id
          }
        }
      })

      if (!member) {
        return c.json({ message: "Unauthorized" }, 401)
      }

      const task = await prisma.task.create({
        data: {
          name,
          description,
          dueDate,
          status,
          priority,
          projectId,
          memberId
        }
      })

      await prisma.activityLog.create({
        data: {
          action: "CREATE",
          memberId: member.id,
          taskId: task.id,
          workspaceId: member.workspaceId
        }
      })

      return c.json({ data: task }, 200)
    })
  .get("/:taskId",
    zValidator("query", z.object({ projectId: z.string() }), (result, c) => {
      if (!result.success) {
        return c.json({ message: "Invalid data." }, 400)
      }
    }),
    async (c) => {
      const { id } = c.get("user")
      const { taskId } = c.req.param()
      const { projectId } = c.req.valid("query")

      const member = await prisma.member.findFirst({
        where: {
          workspace: {
            projects: {
              some: {
                id: {
                  equals: projectId
                }
              }
            }
          },
          userId: {
            equals: id
          }
        }
      })

      if (!member) {
        return c.json({ message: "Unauthorized" }, 401)
      }

      const task = await prisma.task.findUnique({
        where: {
          id: taskId
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

      if (!task) {
        return c.json({ message: "Task not found." }, 404)
      }

      return c.json({ data: task }, 200)
    }
  )
  .patch("/:taskId",
    zValidator("json", updateTaskSchema, (result, c) => {
      if (!result.success) {
        return c.json({ message: "Invalid data." }, 400)
      }
    }),
    zValidator("query", z.object({ projectId: z.string() })),
    async (c) => {
      const { name, description, dueDate, priority, status, memberId } = c.req.valid("json")
      const { projectId } = c.req.valid("query")
      const { id } = c.get("user")
      const { taskId } = c.req.param()

      const member = await prisma.member.findFirst({
        where: {
          workspace: {
            projects: {
              some: {
                id: {
                  equals: projectId
                }
              }
            }
          },
          userId: {
            equals: id
          }
        }
      })

      if (!member) {
        return c.json({ message: "Unauthorized" }, 401)
      }

      const task = await prisma.task.update({
        where: {
          id: taskId
        },
        data: {
          name,
          description,
          priority,
          status,
          dueDate,
          memberId
        }
      })

      const keys = Object.keys(c.req.valid("json"))
      const onlyStatus = keys.length === 1 && keys[0] === 'status'

      if (onlyStatus) {
        await prisma.activityLog.create({
          data: {
            action: "UPDATE",
            memberId: member.id,
            taskId: task.id,
            workspaceId: member.workspaceId
          }
        })
      }

      return c.json({ data: task }, 200)
    }
  )
  .delete("/:taskId",
    zValidator("query", z.object({ projectId: z.string() }), (result, c) => {
      if (!result.success) {
        return c.json({ message: "Invalid data." }, 400)
      }
    }),
    async (c) => {
      const { id } = c.get("user")
      const { taskId } = c.req.param()
      const { projectId } = c.req.valid("query")

      const member = await prisma.member.findFirst({
        where: {
          workspace: {
            projects: {
              some: {
                id: {
                  equals: projectId
                }
              }
            }
          },
          userId: {
            equals: id
          }
        }
      })

      if (!member) {
        return c.json({ message: "Unauthorized." }, 401)
      }

      const task = await prisma.task.delete({
        where: {
          id: taskId
        }
      })

      await prisma.activityLog.create({
        data: {
          action: "DELETE",
          memberId: member.id,
          taskId: task.id,
          workspaceId: member.workspaceId
        }
      })

      return c.json({ data: task }, 200)
    }
  )
  .post("/bulk-delete/:projectId",
    zValidator("json", z.object({ ids: z.array(z.string()) }), (result, c) => {
      if (!result.success) {
        return c.json({ message: "Invalid data." }, 400)
      }
    }),
    async (c) => {
      const { id } = c.get("user")
      const { ids } = c.req.valid("json")
      const { projectId } = c.req.param()

      const member = await prisma.member.findFirst({
        where: {
          workspace: {
            projects: {
              some: {
                id: {
                  equals: projectId
                }
              }
            }
          },
          userId: {
            equals: id
          }
        }
      })

      if (!member) {
        return c.json({ message: "Unauthorized." }, 401)
      }

      const data = await prisma.task.deleteMany({
        where: {
          id: {
            in: ids
          }
        }
      })

      return c.json({ message: `${data.count} accounts deleted successfully.` }, 200)
    }
  )

export default app