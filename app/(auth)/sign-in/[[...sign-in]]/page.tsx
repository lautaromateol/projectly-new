import { SignInForm } from "@/features/auth/components/sign-in-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignInPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1 className="text-2xl text-center font-bold">Welcome back!</h1>
        </CardTitle>
        <CardDescription className="text-center">Insert your credentials to access your dashboard.</CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
    </Card>
  )
}
