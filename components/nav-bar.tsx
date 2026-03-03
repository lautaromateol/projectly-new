import { WorkspaceDropdown } from "@/features/workspaces/components/workspace-dropdown";
import { MobileSidebar } from "./mobile-sidebar";

export function NavBar() {
  return (
    <header className="h-16 w-full bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-x-3">
        <MobileSidebar />
      </div>
      <WorkspaceDropdown />
    </header>
  );
}
