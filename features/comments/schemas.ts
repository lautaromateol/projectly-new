import { z } from "zod";

export const createCommentSchema = z.object({
  content: z.string({ required_error: "Insert comment content." }).trim().min(1, {
    message: "Insert at least 1 character."
  })
})

export const updateCommentSchema = z.object({
  content: z.string({ required_error: "Insert comment content." }).trim().min(1, {
    message: "Insert at least 1 character."
  })
})