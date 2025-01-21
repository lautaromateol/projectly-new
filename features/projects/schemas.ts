import { z } from "zod"

export const createProjectSchema = z.object({
  name: z.string({ required_error: "Insert a project name." }).trim().min(1, {
    message: "Insert at least 1 character"
  }),
  imageUrl: z.union([
    z.instanceof(File),
    z.string().transform((value) => value === "" ? undefined : value)
  ]).optional()
})

export const updateWorskspaceSchema = z.object({
  name: z.string({ required_error: "Insert a project name." }).trim().min(1, {
    message: "Insert at least 1 character"
  }).optional(),
  imageUrl: z.union([
    z.instanceof(File),
    z.string().transform((value) => value === "" ? undefined : value)
  ]).optional()
})