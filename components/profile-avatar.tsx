"use client"
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Loader2 } from "lucide-react";

export function ProfileAvatar() {

  const { user, isLoaded } = useUser()

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center w-full">
        <Loader2 className="size-8 animate-spin text-rose-600" />
      </div>
    )
  }

  return (
    <>
      {user ? (
        <div className="flex items-center gap-x-2 rounded-md shadow-sm p-4">
          <Avatar>
            <AvatarImage src={user.imageUrl} />
            <AvatarFallback>{user.firstName?.at(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-0.5">
            <p className="text-sm font-medium">{user.fullName}</p>
            <p className="text-xs font-medium text-muted-foreground">{user.emailAddresses[0].emailAddress}</p>
          </div>
        </div>
      ) : null}
    </>
  )
}
