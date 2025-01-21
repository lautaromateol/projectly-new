import Image from "next/image";
import { cn } from "@/lib/utils";

interface MemberAvatarProps {
  name: string;
  imageUrl?: string;
  className?: string;
}

export function MemberAvatar({ name, imageUrl, className }: MemberAvatarProps) {
  if (imageUrl) {
    return (
      <div className={cn(
        "size-6 rounded-full relative overflow-hidden",
        className
      )}>
        <Image src={imageUrl} alt={name} fill />
      </div>
    )
  }

  return (
    <div className={cn(
      "flex items-center justify-center rounded-full bg-rose-700 text-white font-medium size-6",
      className
    )}>
      {name.at(0)?.toLowerCase()}
    </div>
  )
}
