import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"
import { IconType } from "react-icons/lib"

const boxVariant = cva(
  "p-3 rounded grid place-items-center",
  {
    variants: {
      variant: {
        default: "bg-slate-400/20",
        success: "bg-emerald-400/20",
        danger: "bg-rose-400/20"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

const iconVariant = cva(
  "size-6",
  {
    variants: {
      variant: {
        default: "fill-slate-300 text-slate-500",
        success: "fill-emerald-300 text-emerald-500",
        danger: "fill-rose-300 text-rose-500"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

type BoxVariant = VariantProps<typeof boxVariant>
type IconVariant = VariantProps<typeof iconVariant>

interface SummaryCardProps extends BoxVariant, IconVariant {
  title: string;
  amount: number;
  icon: IconType
}

export function SummaryCard({ title, amount, icon: Icon, variant }: SummaryCardProps) {
  return (
    <div className="w-full h-20 p-3 border rounded flex items-center gap-x-4">
      <div className={cn(boxVariant({ variant }))}>
        <Icon className={cn(iconVariant({ variant }))} />
      </div>
      <div className="space-y-0.5">
        <p className="text-sm font-semibold">{amount} {title}</p>
        <p className="text-xs text-muted-foreground">in the last 7 days.</p>
      </div>
    </div>
  )
}
