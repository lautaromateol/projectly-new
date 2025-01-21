import Image from "next/image";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { MemberAvatar } from "@/features/members/components/member-avatar";

export async function Navbar() {

  const { userId } = await auth()

  const { users } = await clerkClient()

  const user = await users.getUser(userId!)

  return (
    <header className="h-16 w-full bg-rose-50/30 flex items-center justify-between px-4 py-6 border-b border-rose-100/80">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={40}
        height={40}
      />
      <div className="flex items-center gap-x-2">
        <MemberAvatar
          name={user.fullName!}
          imageUrl={user.imageUrl ?? ""}
          className="size-8"
        />
        <p className="text-sm font-medium">{user.fullName}</p>
      </div>
    </header>
  )
}
