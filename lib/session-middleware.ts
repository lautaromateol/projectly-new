import { createMiddleware } from "hono/factory"

interface SessionMiddleware {
  Variables: {
    userId: string;
  }
}

export const sessionMiddleware = createMiddleware<SessionMiddleware>(
  async(c, next) => {
    const user = c.get("clerkAuth")

    if(!user || !user.userId) {
      return c.json({ message: "Unauthorized" }, 401)
    }

    c.set("userId", user.userId)

    await next()
  }
)