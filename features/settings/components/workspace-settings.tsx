import { toast } from "sonner";
import { CopyIcon, Loader2 } from "lucide-react";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { UpdateWorkspaceForm } from "@/features/workspaces/components/update-workspace-form";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function WorkspaceSettings() {

  const workspaceId = useWorkspaceId()
  const { workspace, isLoadingWorkspace } = useGetWorkspace({ workspaceId })

  const fullInviteLink = `${window.location.origin}/${workspace?.id}/join/${workspace?.inviteCode}`

  function handleCopyInviteLink() {
    navigator.clipboard.writeText(fullInviteLink).then(() => toast.success("Invite link copied to clipboard."))
  }

  if (isLoadingWorkspace) {
    return (
      <div className="flex items-center justify-center w-full">
        <Loader2 className="size-8 animate-spin text-rose-600" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Update workspace</CardTitle>
        </CardHeader>
        <CardContent>
          {workspace && (
            <UpdateWorkspaceForm workspace={workspace} />
          )}
        </CardContent>
      </Card>
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Invite members</CardTitle>
          <CardDescription>Share the URL to invite new members to your workspace.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-x-2">
            <Input disabled value={fullInviteLink} />
            <Button
              variant="outline"
              className="size-8"
              onClick={handleCopyInviteLink}
            >
              <CopyIcon className="size-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-rose-600">Danger zone</CardTitle>
          <CardDescription className="text-rose-600">If you delete this workspace, all related data will be unrecoverable.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="destructive"
          >
            Delete workspace
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
