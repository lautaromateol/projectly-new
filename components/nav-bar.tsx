import Image from "next/image";

export function NavBar() {
  return (
    <nav className="h-16 w-full bg-rose-50/30 flex items-center justify-between px-4 py-6 border-b border-rose-100/80">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={48}
        height={48}
      />
    </nav>
  )
}
