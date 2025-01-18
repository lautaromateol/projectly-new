"use client"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { SignUp } from "@clerk/nextjs"

export function SignUpForm() {

  return (
    <div className="space-y-6">
      <SignUp appearance={{
        elements: {
          header: {
            display: "none"
          },
          card: {
            boxShadow: "none",
            border: "none",
          },
          cardBox: {
            width: "200%",
            boxShadow: "none",
            border: "none"
          },
          footer: {
            display: "none"
          },
          formButtonPrimary: {
            backgroundImage: "linear-gradient(to bottom, #dc2626, #b91c1c)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
          },
        }
      }} />
      <Separator className="w-full" />
      <p className="text-center text-sm font-medium text-muted-foreground">Already have an account?{" "}
        <Link href="/sign-in">
          <span className="text-rose-600 underline text-sm font-medium">Sign in</span>
        </Link>
      </p>
    </div>
  )
}
