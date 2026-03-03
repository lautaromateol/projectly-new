import Image from "next/image";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";
import { Workspaces } from "@/features/workspaces/components/workspaces";
import { Projects } from "@/features/projects/components/projects";
import { ProfileAvatar } from "./profile-avatar";

export function Sidebar() {
  return (
    <aside className="flex flex-col fixed top-0 left-0 h-screen w-64 bg-slate-900 border-r border-slate-800">
      {/* Logo */}
      <div className="flex items-center gap-x-3 px-5 h-16 border-b border-slate-800 shrink-0">
        <Link href="/" className="flex items-center gap-x-2.5">
          <Image src="/logo.svg" alt="Projectly" width={30} height={30} />
          <span className="text-white font-bold text-base tracking-tight">Projectly</span>
        </Link>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 flex flex-col overflow-y-auto py-5 px-3 space-y-5">
        <ProfileAvatar />
        <Workspaces />
        <Projects />
      </div>

      {/* Sign out */}
      <div className="shrink-0 px-3 py-4 border-t border-slate-800">
        <SignOutButton>
          <button className="flex items-center gap-x-2.5 w-full px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors">
            <LogOut className="size-4" />
            <span>Sign out</span>
          </button>
        </SignOutButton>
      </div>
    </aside>
  );
}
