import { CreateWorkspaceForm } from "@/features/workspaces/components/create-workspace-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CreateWorskpacePage() {

  return (
    <div className="flex items-center justify-center">
        <Card>
        <CardHeader>
          <CardTitle>Create Workspace</CardTitle>
          <CardDescription>Create your first workspace to continue to your dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <CreateWorkspaceForm />
        </CardContent>
      </Card>
    </div>
  )
}
