import { SignUpForm } from "@/features/auth/components/sign-up-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignUpPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1 className="text-2xl text-center font-bold">Sign Up!</h1>
        </CardTitle>
        <CardDescription className="text-center">Insert your credentials to create your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
    </Card>
  )
}
