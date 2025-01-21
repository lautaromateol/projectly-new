import Image from "next/image";
import { WorkspaceDropdown } from "@/features/workspaces/components/workspace-dropdown";
import { MobileSidebar } from "./mobile-sidebar";

export function NavBar() {
  return (
    <header className="h-16 w-full bg-rose-50/30 flex items-center justify-between px-4 py-6 border-b border-rose-100/80">
      <div className="flex items-center gap-x-2">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={40}
          height={40}
        />
        <MobileSidebar />
      </div>
      <WorkspaceDropdown />
    </header>
  )
}
