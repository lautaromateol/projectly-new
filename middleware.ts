import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)"
])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()

  if(userId && isPublicRoute(req)) {
    const path = "/dashboard"

    const pathUrl = new URL(path, req.url)
    return NextResponse.redirect(pathUrl)
  }

  if(!userId && !isPublicRoute) {
    return (await auth()).redirectToSignIn({ returnBackUrl: req.url })
  }

  return NextResponse.next()
})


export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};