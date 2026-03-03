"use client"
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Loader2 } from "lucide-react";

export function ProfileAvatar() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center px-3 py-2">
        <Loader2 className="size-4 animate-spin text-slate-500" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex items-center gap-x-3 px-3 py-2.5 rounded-lg bg-slate-800 border border-slate-700/50">
      <Avatar className="size-8 shrink-0">
        <AvatarImage src={user.imageUrl} />
        <AvatarFallback className="bg-rose-600 text-white text-xs font-semibold">
          {user.firstName?.at(0)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white truncate leading-tight">{user.fullName}</p>
        <p className="text-xs text-slate-400 truncate leading-tight mt-0.5">{user.emailAddresses[0].emailAddress}</p>
      </div>
    </div>
  );
}
