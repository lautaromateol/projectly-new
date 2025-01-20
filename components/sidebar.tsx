import { Workspaces } from "@/features/workspaces/components/workspaces";
import { ProfileAvatar } from "./profile-avatar";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export function Sidebar() {
  return (
    <aside className="flex flex-col justify-between fixed top-0 left-0 h-screen w-64 bg-rose-50/30 py-6 px-4 border-r border-rose-100/80">
      <div className="space-y-6">
        <ProfileAvatar />
        <Workspaces />
      </div>
      <SignOutButton>
        <Button variant="secondary">
          Sign Out
        </Button>
      </SignOutButton>
    </aside>
  )
}
