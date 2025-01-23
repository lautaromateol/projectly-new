import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { TaskStatus } from "@prisma/client/edge"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        [TaskStatus.TO_DO]: "border-transparent bg-rose-500 text-white hover:bg-rose-500/80",
        [TaskStatus.IN_PROGRESS]: "border-transparent bg-amber-500 text-white hover:bg-amber-500/80",
        [TaskStatus.IN_REVIEW]: "border-transparent bg-cyan-500 text-white hover:bg-cyan-500/80",
        [TaskStatus.DONE]: "border-transparent bg-emerald-500 text-white hover:bg-emerald-500/80",
        [TaskStatus.OVERDUE]: "border-transparent bg-pink-500 text-white hover:bg-pink-500/80"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
