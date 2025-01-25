import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";

export async function Navbar() {

  const { userId } = await auth()

  return (
    <header className="h-16 w-full bg-rose-50/30 flex items-center justify-between px-4 py-6 border-b border-rose-100/80">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={40}
          height={40}
        />
      </Link>
      <div className="flex items-center gap-x-2">
        {
          userId ? (
            <Link href="/dashboard">
              <Button>Dashboard</Button>
            </Link>
          ) : (
            <Link href="/sign-in">
              <Button>Sign in</Button>
            </Link>
          )
        }
      </div>
    </header>
  )
}
