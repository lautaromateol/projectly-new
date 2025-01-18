import { Workspaces } from "@/features/workspaces/components/workspaces";
import { ProfileAvatar } from "./profile-avatar";

export function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-rose-50/30 py-6 px-4 border-r border-rose-100/80 space-y-6">
      <ProfileAvatar />
      <Workspaces />
    </aside>
  )
}
