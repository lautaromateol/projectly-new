import { MoreHorizontal } from "lucide-react";
import { Member } from "@prisma/client/edge"
import { useUpdateRole } from "@/features/members/api/use-update-role";
import { useDeleteMember } from "@/features/members/api/use-delete-member";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface MemberDropdownProps {
  member: Member;
}

export function MemberDropdown({ member }: MemberDropdownProps) {

  const { updateRole, isUpdatingRole } = useUpdateRole()
  const { deleteMember, isDeletingMember } = useDeleteMember()

  const isPending = isUpdatingRole || isDeletingMember

  function handleUpdateRole() {
    updateRole({
      json: { role: member.role === "ADMIN" ? "MEMBER" : "ADMIN" },
      param: { memberId: member.id }
    })
  }

  function handleDeleteMember() {
    deleteMember({
      param: { memberId: member.id }
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer" onClick={handleUpdateRole} disabled={isPending}>
          <p>Make <span className="capitalize">{member.role === "ADMIN" ? "member" : "admin"}</span></p>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleDeleteMember} disabled={isPending}>
          <p>Remove {member.name} from workspace</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
