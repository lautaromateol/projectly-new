"use client"
import { useRouter } from "next/navigation";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useDeleteProject } from "@/features/projects/api/use-delete-project";
import { useUpdateProjectModal } from "@/features/projects/hooks/use-update-project-modal";
import { useConfirm } from "@/hooks/use-confirm";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function ProjectDropdown() {

  const router = useRouter()

  const [ConfirmationDialog, confirm] = useConfirm(
    "Delete Project",
    "Are you sure that you want to delete this project? This action is irreversible.",
    "destructive"
  )

  const { deleteProject, isDeletingProject } = useDeleteProject()

  const { open } = useUpdateProjectModal()

  async function handleDeleteProject() {
    const ok = await confirm()

    if (ok) {
      deleteProject(undefined, {
        onSuccess: (data) => router.push(`/dashboard/${data.workspaceId}`)
      })
    }
  }

  return (
    <DropdownMenu>
      <ConfirmationDialog />
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={open} className="cursor-pointer" disabled={isDeletingProject}>
          <div className="flex items-center gap-x-2">
            <Pencil className="size-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground font-medium">Edit</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="w-full" />
        <DropdownMenuItem onClick={handleDeleteProject} className="cursor-pointer" disabled={isDeletingProject}>
          <div className="flex items-center gap-x-2">
            <Trash className="size-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground font-medium">Delete</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
