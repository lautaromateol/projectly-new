import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProjectAvatarProps {
  name: string;
  imageUrl?: string;
  className?: string;
}

export function ProjectAvatar({ name, imageUrl, className }: ProjectAvatarProps) {
  if (imageUrl) {
    return (
      <div className={cn(
        "size-6 rounded-lg relative overflow-hidden",
        className
      )}>
        <Image src={imageUrl} alt={name} fill />
      </div>
    )
  }

  return (
    <div className={cn(
      "flex items-center justify-center rounded-lg bg-rose-500 text-white font-medium size-6",
      className
    )}>
      {name.at(0)}
    </div>
  )
}
