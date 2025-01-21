import { Navbar } from "./components/navbar";

export default function StandaloneLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-8">
      <Navbar />
      <main>{children}</main>
    </div>
  )
}
