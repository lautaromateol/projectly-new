import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CopyIcon, Loader2 } from "lucide-react";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useDeleteWorkspace } from "@/features/workspaces/api/use-delete-workspace";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { UpdateWorkspaceForm } from "@/features/workspaces/components/update-workspace-form";
import { useOpenWorkspaceSettingsModal } from "@/features/settings/hooks/use-open-workspace-settings-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function WorkspaceSettings() {

  const router = useRouter()

  const workspaceId = useWorkspaceId()
  const { close } = useOpenWorkspaceSettingsModal()
  const { workspace, isLoadingWorkspace } = useGetWorkspace({ workspaceId })
  const { deleteWorkspace, isDeletingWorkspace } = useDeleteWorkspace({ workspaceId })

  const fullInviteLink = `${window.location.origin}/${workspace?.id}/join/${workspace?.inviteCode}`

  function handleDeleteWorkspace() {
    deleteWorkspace({
      param: { workspaceId }
    }, {
      onSuccess: () => {
        close()
        router.push("/dashboard")
      }
    })
  }

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
              disabled={isDeletingWorkspace}
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
            onClick={handleDeleteWorkspace}
            disabled={isDeletingWorkspace}
            variant="destructive"
          >
            Delete Workspace
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
