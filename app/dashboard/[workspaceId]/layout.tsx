import { NavBar } from "@/components/nav-bar"
import { Sidebar } from "@/components/sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="lg:pl-64 flex flex-col w-full">
        <NavBar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
