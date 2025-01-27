import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator"
import { TaskStatus } from "@prisma/client/edge";
import { createTaskSchema, updateTaskSchema } from "@/features/tasks/schemas";
import { sessionMiddleware } from "@/lib/session-middleware";
import { prisma } from "@/lib/prisma";
import { isInRange } from "@/lib/utils";

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

      const lastTask = await prisma.task.findFirst({
        where: {
          projectId: {
            equals: projectId
          },
          status: {
            equals: status
          }
        },
        orderBy: {
          position: "asc"
        }
      })

      const position = lastTask ? lastTask.position + 1 : 1

      const task = await prisma.task.create({
        data: {
          name,
          description,
          dueDate,
          status,
          priority,
          position,
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
    zValidator("param", z.object({ taskId: z.string().optional() })),
    zValidator("query", z.object({ projectId: z.string() }), (result, c) => {
      if (!result.success) {
        return c.json({ message: "Invalid data." }, 400)
      }
    }),
    async (c) => {
      const { id } = c.get("user")
      const { taskId } = c.req.valid("param")
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
    zValidator("param", z.object({ taskId: z.string().optional() })),
    zValidator("json", updateTaskSchema, (result, c) => {
      if (!result.success) {
        return c.json({ message: "Invalid data." }, 400)
      }
    }),
    zValidator("query", z.object({ projectId: z.string() })),
    async (c) => {
      const { name, description, dueDate, priority, status, position, memberId } = c.req.valid("json")
      const { projectId } = c.req.valid("query")
      const { taskId } = c.req.valid("param")
      const { id } = c.get("user")

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
          position,
          dueDate,
          memberId
        }
      })

      const keys = Object.keys(c.req.valid("json"))
      const onlyStatus = keys.length === 1 && keys[0] === 'status'

      if (!onlyStatus) {
        await prisma.activityLog.create({
          data: {
            action: "UPDATE",
            memberId: member.id,
            taskId: task.id,
            workspaceId: member.workspaceId
          }
        })
      } else if (status === "DONE") {
        await prisma.activityLog.create({
          data: {
            action: "COMPLETE",
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

      await prisma.task.deleteMany({
        where: {
          id: {
            in: ids
          }
        }
      })

      return c.json({ message: `${ids.length} tasks deleted successfully.` }, 200)
    }
  )
  .patch("/bulk-update/:projectId",
    zValidator("json", z.object({
      tasks:
        z.array(z.object({
          id: z.string(),
          status: z.nativeEnum(TaskStatus),
          oldStatus: z.nativeEnum(TaskStatus),
          position: z.number()
        }))
    }), (result, c) => {
      if (!result.success) {
        return c.json({ message: "Invalid data." }, 400)
      }
    }),
    async (c) => {
      const { id } = c.get("user")
      const { tasks } = c.req.valid("json")
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

      await prisma.$transaction([
        ...tasks.map((task) =>
          prisma.task.update({
            where: {
              id: task.id
            },
            data: {
              status: task.status,
              position: task.position
            }
          })
        ),
        ...tasks
          .filter((task) => task.oldStatus !== task.status && task.status === "DONE")
          .map((task) =>
            prisma.activityLog.create({
              data: {
                action: "COMPLETE",
                memberId: member.id,
                workspaceId: member.workspaceId,
                taskId: task.id
              }
            })
          )
      ]);
      
      return c.json({ data: tasks.map((task) => task.id) }, 200)
    }
  )
  .get("/summary/:projectId",
    async (c) => {
      const { projectId } = c.req.param()
      const { id } = c.get("user")

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

      // Todas las tareas del proyecto
      const tasks = await prisma.task.findMany({
        where: {
          projectId
        },
        include: {
          activityLogs: {
            select: {
              action: true,
              createdAt: true
            }
          }
        },
      })

      const completedTasks = tasks.filter((task) => {
        const hasBeenCompleted = !!task.activityLogs.find((log) => log.action === "COMPLETE" && isInRange({ date: log.createdAt, interval: 7 }))
        return task.status === "DONE" && hasBeenCompleted
      }).length

      const updatedTasks = tasks.filter((task) => {
        const hasBeenUpdated = !!task.activityLogs.find((log) => log.action === "UPDATE" && isInRange({ date: log.createdAt, interval: 7 }))
        return task.status !== "DONE" && hasBeenUpdated
      }
      ).length

      const createdTasks = tasks.filter((task) =>
        isInRange({
          date: new Date(task.createdAt),
          interval: 7
        })
      ).length

      const overdueTasks = tasks.filter((task) =>
        isInRange({
          date: new Date(task.dueDate),
          interval: 7
        })
      ).length

      return c.json({
        data: {
          completedTasks,
          updatedTasks,
          createdTasks,
          overdueTasks
        }
      })
    }
  )
  

export default app