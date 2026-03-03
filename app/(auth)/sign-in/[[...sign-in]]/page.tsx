import { SignInForm } from "@/features/auth/components/sign-in-form";

export default function SignInPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back</h1>
        <p className="text-slate-500 text-sm">Sign in to your account to continue</p>
      </div>
      <SignInForm />
    </div>
  );
}
