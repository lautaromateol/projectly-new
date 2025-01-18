import Image from "next/image";

interface WorkspaceAvatarProps {
  name: string;
  imageUrl?: string;
}

export function WorkspaceAvatar({ name, imageUrl }: WorkspaceAvatarProps) {
  if (imageUrl) {
    return (
      <div className="size-6 rounded-full relative overflow-hidden">
        <Image src={imageUrl} alt={name} fill />
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center rounded-full bg-rose-700 text-white font-medium size-6">{name.at(0)?.toLowerCase()}</div>
  )
}
