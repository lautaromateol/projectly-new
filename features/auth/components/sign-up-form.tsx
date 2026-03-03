"use client"
import Link from "next/link"
import { SignUp } from "@clerk/nextjs"

export function SignUpForm() {
  return (
    <div>
      <SignUp
        appearance={{
          variables: {
            colorPrimary: "#e11d48",
            colorBackground: "#ffffff",
            colorInputBackground: "#f8fafc",
            colorInputText: "#0f172a",
            colorTextOnPrimaryBackground: "#ffffff",
            colorTextSecondary: "#64748b",
            colorNeutral: "#64748b",
            borderRadius: "0.5rem",
            fontFamily: "inherit",
            spacingUnit: "1rem",
          },
          elements: {
            card: {
              boxShadow: "none",
              border: "none",
              padding: "0",
              backgroundColor: "transparent",
            },
            rootBox: {
              width: "100%",
            },
            cardBox: {
              width: "100%",
              boxShadow: "none",
              border: "none",
              backgroundColor: "transparent",
            },
            header: { display: "none" },
            footer: { display: "none" },
            formButtonPrimary: {
              background: "linear-gradient(to bottom, #e11d48, #be123c)",
              boxShadow: "0 2px 8px rgba(225, 29, 72, 0.3)",
              fontSize: "14px",
              fontWeight: "500",
              transition: "opacity 0.15s ease",
            },
            formFieldInput: {
              borderColor: "#e2e8f0",
              fontSize: "14px",
            },
            formFieldLabel: {
              fontSize: "13px",
              fontWeight: "500",
              color: "#374151",
            },
            dividerLine: { backgroundColor: "#e2e8f0" },
            dividerText: { color: "#9ca3af", fontSize: "12px" },
            socialButtonsBlockButton: {
              border: "1px solid #e2e8f0",
              fontSize: "14px",
              fontWeight: "500",
              color: "#374151",
            },
            socialButtonsBlockButtonText: {
              color: "#374151",
            },
          },
        }}
      />
      <p className="text-center text-sm text-slate-500 mt-4">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="text-rose-600 hover:text-rose-700 font-medium underline underline-offset-4 transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}
