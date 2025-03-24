import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";

export async function Navbar() {

  const { userId } = await auth()

  return (
    <header className="sticky top-0 z-40 px-4 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={40}
            height={40}
          />
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {
              userId ? (
                <Button asChild className="bg-rose-600 hover:bg-rose-700">
                  <Link href="/dashboard">
                    Dashboard
                  </Link>
                </Button>
              ) : (
                <>
                  <Button variant="ghost">
                    <Link href="/sign-in">
                      Sign In
                    </Link>
                  </Button>
                  <Link href="/sign-up">
                    <Button className="bg-rose-600 hover:bg-rose-700">
                      Get Started
                    </Button>
                  </Link>
                </>
              )
            }
          </nav>
        </div>
      </div>
    </header>
  )
}

