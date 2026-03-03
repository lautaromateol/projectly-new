import { SignUpForm } from "@/features/auth/components/sign-up-form";

export default function SignUpPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Create an account</h1>
        <p className="text-slate-500 text-sm">Start managing your projects today — it&apos;s free</p>
      </div>
      <SignUpForm />
    </div>
  );
}
