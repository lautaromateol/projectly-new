import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-[45%] bg-gradient-to-br from-rose-950 via-rose-900 to-slate-900 flex-col justify-between p-12 relative overflow-hidden">
        {/* Decorative background blurs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/3 -left-20 w-60 h-60 bg-rose-700/25 rounded-full blur-2xl" />
          <div className="absolute -bottom-32 -right-16 w-72 h-72 bg-rose-800/30 rounded-full blur-3xl" />
        </div>

        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-x-3">
          <Image src="/logo.svg" alt="Projectly" width={38} height={38} />
          <span className="text-white font-bold text-xl tracking-tight">Projectly</span>
        </div>

        {/* Tagline */}
        <div className="relative z-10 space-y-5">
          <h1 className="text-4xl font-bold text-white leading-tight tracking-tight">
            Manage projects <br />
            with confidence.
          </h1>
          <p className="text-rose-200/75 text-base leading-relaxed max-w-sm">
            Streamline teamwork, track progress, and deliver results — all in one workspace.
          </p>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-3 gap-6">
          {[
            { value: "10k+", label: "Projects" },
            { value: "50k+", label: "Tasks Done" },
            { value: "5k+", label: "Teams" },
          ].map((stat) => (
            <div key={stat.label} className="space-y-1">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-rose-300/70 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right form area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Mobile logo */}
        <nav className="lg:hidden flex items-center gap-x-3 px-6 py-5 border-b border-slate-100">
          <Link href="/" className="flex items-center gap-x-2">
            <Image src="/logo.svg" alt="Projectly" width={30} height={30} />
            <span className="font-bold text-slate-900 text-lg tracking-tight">Projectly</span>
          </Link>
        </nav>

        <div className="flex-1 flex items-center justify-center p-6 lg:p-16">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
