import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, BarChart2, Users, Star, Calendar } from "lucide-react"

export default function ProjectManagementLanding() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Manage projects with{" "}
                    <span className="underline decoration-rose-600 decoration-4 underline-offset-4">efficiency</span>{" "}
                    and{" "}
                    <span className="relative px-1">
                      <span className="absolute inset-0 bg-gradient-to-r from-rose-600/20 to-rose-600/10 rounded-md"></span>
                      <span className="relative">precision</span>
                    </span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Projectly helps teams organize, track, and manage their work in one collaborative space. Streamline
                    your workflow and boost productivity.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-rose-600 hover:bg-rose-700">Start for free</Button>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <CheckCircle className="h-4 w-4 text-rose-600" />
                  <span>No credit card required</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full aspect-video overflow-hidden rounded-xl shadow-2xl">
                  <Image
                    src="/dashboard.png?height=720&width=1280"
                    width={1280}
                    height={720}
                    alt="Projectly dashboard preview"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Everything you need to{" "}
                  <span className="bg-gradient-to-r from-rose-600 to-rose-400 bg-clip-text text-transparent">
                    supercharge
                  </span>{" "}
                  your workflow
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Projectly combines powerful features with an intuitive interface to help your team achieve more
                  together.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="grid gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-600/10">
                    <Calendar className="h-5 w-5 text-rose-600" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">Date Tracking</h3>
                    <p className="text-muted-foreground">
                      Keep an eye on the delivery date of your projects with our implemented calendar.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-600/10">
                    <BarChart2 className="h-5 w-5 text-rose-600" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">Advanced Analytics</h3>
                    <p className="text-muted-foreground">
                      Gain valuable insights with comprehensive reports and dashboards to make data-driven decisions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-600/10">
                    <Users className="h-5 w-5 text-rose-600" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">Team Collaboration</h3>
                    <p className="text-muted-foreground">
                      Work together seamlessly with real-time updates, comments, and file sharing capabilities.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative flex items-center justify-center">
                <div className="relative w-full aspect-video overflow-hidden rounded-xl shadow-xl">
                  <Image
                    src="/analytics.png?height=400&width=800"
                    width={800}
                    height={400}
                    alt="Projectly features"
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-lg bg-rose-600/10 backdrop-blur-sm"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  What our{" "}
                  <span className="relative">
                    <span className="absolute bottom-0 left-0 right-0 h-3 bg-rose-600/20"></span>
                    <span className="relative">customers</span>
                  </span>{" "}
                  are saying
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Don&apos;t just take our word for it. Here&apos;s what teams around the world have to say about Projectly.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              {[
                {
                  quote:
                    "Projectly has transformed how our team collaborates. We've increased productivity by 35% since implementing it.",
                  author: "Sarah Johnson",
                  role: "Product Manager, TechCorp",
                },
                {
                  quote:
                    "The intuitive interface and powerful features make Projectly the perfect solution for our project management needs.",
                  author: "Michael Chen",
                  role: "CTO, Innovate Inc.",
                },
                {
                  quote:
                    "We've tried many project management tools, but Projectly stands out with its flexibility and ease of use.",
                  author: "Emily Rodriguez",
                  role: "Team Lead, Creative Solutions",
                },
              ].map((testimonial, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-rose-600 text-rose-600" />
                        ))}
                      </div>
                      <p className="text-lg">{testimonial.quote}</p>
                      <div className="flex items-center gap-4 pt-4">
                        <div>
                          <p className="font-medium">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to{" "}
                  <span className="underline decoration-rose-600 decoration-4 underline-offset-4">revolutionize</span>{" "}
                  your workflow?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of teams that trust Projectly to manage their projects efficiently.
                </p>
              </div>
                <Button className="w-1/4 bg-rose-600 hover:bg-rose-700">Get started for free</Button>
              <div className="text-sm text-muted-foreground">No credit card required.</div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t px-4 py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Projectly. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

