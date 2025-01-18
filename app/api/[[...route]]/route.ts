import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { clerkMiddleware } from "@hono/clerk-auth";
import workspaces from "@/features/workspaces/server/route"

export const runtime = 'edge'

const app = new Hono().basePath('/api')
  .use("*", clerkMiddleware())
  .route("/workspaces", workspaces)

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)

export type AppType = typeof app