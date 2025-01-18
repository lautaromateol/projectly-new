import { useRouter } from "next/navigation"
import { useGetWorskpaces } from "@/features/workspaces/api/use-get-workspaces"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { WorkspaceAvatar } from "./workspace-avatar"

export function WorkspacesSwitcher() {

  const router = useRouter()

  const { workspaces, isLoadingWorskpaces } = useGetWorskpaces()
  const workspaceId = useWorkspaceId()

  function onValueChange(workspaceId: string) {
    router.push(`/dashboard/${workspaceId}`)
  }

  if (isLoadingWorskpaces) {
    return (
      <Skeleton className="h-9 w-full" />
    )
  }

  return (
    <Select value={workspaceId} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select a workspace" />
      </SelectTrigger>
      <SelectContent>
        {workspaces?.map((workspace) => (
          <SelectItem value={workspace.id} key={workspace.id}>
            <div className="flex items-center gap-x-2">
              <WorkspaceAvatar
                name={workspace.name}
                imageUrl={workspace.imageUrl ?? ""}
              />
              <p className="text-sm font-medium">{workspace.name}</p>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
