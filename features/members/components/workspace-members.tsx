import { Loader2 } from "lucide-react";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { MemberAvatar } from "./member-avatar";
import { MemberDropdown } from "./member-dropdown";
import { useUser } from "@clerk/nextjs";

export function WorkspaceMembers() {

  const { members, isLoadingMembers } = useGetMembers()

  const { user } = useUser()

  if (isLoadingMembers) {
    return (
      <div className="flex items-center justify-center w-full">
        <Loader2 className="size-8 animate-spin text-rose-600" />
      </div>
    )
  }

  return (
    <div className="p-4 w-full space-y-4">
      {members?.map((member) => (
        <div className="flex items-center justify-between border p-2 rounded-lg bg-rose-100/30" key={member.id}>
          <div className="flex items-center gap-x-2">
            <MemberAvatar
              name={member.name}
              imageUrl={member.imageUrl ?? ""}
              className="size-10"
            />
            <p className="text-base font-medium">{member.name}</p>
            {member.role === "ADMIN" && (
              <p className="text-base font-medium text-muted-foreground capitalize">{member.role.toLowerCase()}</p>
            )}
          </div>
          {user && user.id !== member.userId && (
            <MemberDropdown member={member} />
          )}
        </div>
      ))}
    </div>
  )
}
