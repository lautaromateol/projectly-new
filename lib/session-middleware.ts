import { User } from "@clerk/backend";
import { createMiddleware } from "hono/factory"

interface SessionMiddleware {
  Variables: {
    user: User;
  }
}

export const sessionMiddleware = createMiddleware<SessionMiddleware>(
  async (c, next) => {
    const user = c.get("clerkAuth")
    const clerk = c.get("clerk")

    if (!user || !user.userId) {
      return c.json({ message: "Unauthorized" }, 401)
    }

    const fullUser = await clerk.users.getUser(user.userId)

    c.set("user", fullUser)

    await next()
  }
)