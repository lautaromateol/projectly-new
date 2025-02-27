import { $Enums } from "@prisma/client/edge";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { useOpenWorkspaceMembersModal } from "@/features/members/hooks/use-open-workspace-members-modal";

interface WorkspaceMembersInterface {
  members: {
    userId: string;
    id: string;
    name: string;
    imageUrl: string | null;
    role: $Enums.Role;
    workspaceId: string;
  }[];
}

export function WorkspaceMembers({ members }: WorkspaceMembersInterface) {

  const { open } = useOpenWorkspaceMembersModal()

  return (
    <div onClick={open} className="flex -space-x-2 cursor-pointer">
      {members.map((member) => (
        <MemberAvatar className="size-8" name={member.name} imageUrl={member.imageUrl ?? ""} key={member.id} />
      ))}
    </div>
  )
}
