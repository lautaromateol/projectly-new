import { TaskPriority, TaskStatus } from "@prisma/client/edge";
import { z } from "zod";

export const createTaskSchema = z.object({
  name: z.string({ required_error: "Insert a task name." }).trim().min(1, {
    message: "Insert at least 1 character"
  }),
  description: z.string({ required_error: "Insert a task description." }).trim().min(1, {
    message: "Insert at least 1 character"
  }),
  dueDate: z.coerce.date({ required_error: "Insert task due date." }),
  status: z.nativeEnum(TaskStatus),
  priority: z.nativeEnum(TaskPriority),
  memberId: z.string().optional()
})

export const updateTaskSchema = z.object({
  name: z.string({ required_error: "Insert a task name." }).trim().min(1, {
    message: "Insert at least 1 character"
  }).optional(),
  description: z.string({ required_error: "Insert a task description." }).trim().min(1, {
    message: "Insert at least 1 character"
  }).optional(),
  dueDate: z.coerce.date({ required_error: "Insert task due date." }).optional(),
  status: z.nativeEnum(TaskStatus).optional(),
  priority: z.nativeEnum(TaskPriority).optional(),
  memberId: z.string().optional()
})