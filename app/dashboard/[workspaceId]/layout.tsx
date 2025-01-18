import { NavBar } from "@/components/nav-bar"
import { Sidebar } from "@/components/sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex">
      <Sidebar />
      <div className="pl-64 flex flex-col w-full">
        <NavBar />
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
  )
}
