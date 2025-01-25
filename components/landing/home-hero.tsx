import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

export function HomeHero() {
  return (
    <section className="max-w-7xl mx-auto pt-24 md:pt-48 pb-12 md:pb-24 px-4 lg:px-0">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold tracking-wide text-rose-700">Manage all your projects in one application</h1>
            <p className="text-base text-rose-400">Get track of your all your tasks and share your projects with another users.</p>
          </div>
          <div>
            <Link href="/auth/sign-up">
              <Button>Start now</Button>
            </Link>
          </div>
        </div>
        <Image src="/hero-illustration.svg" width={500} height={700} alt="Hero Illustration" />
      </div>
    </section>
  )
}
