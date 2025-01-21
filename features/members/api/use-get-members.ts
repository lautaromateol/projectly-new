import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

interface UserGetMembersProps {
  workspaceId: string;
}

type ResponseType = InferResponseType<typeof client.api.members[":workspaceId"]["$get"], 200>["data"]

export function useGetMembers({ workspaceId }: UserGetMembersProps) {
  const { data: members, isLoading: isLoadingMembers } = useQuery<ResponseType, Error>({
    queryKey: ["members", { workspaceId }],
    queryFn: async() => {
      const response = await client.api.members[":workspaceId"]["$get"]({
        param: { workspaceId }
      })

      if(!response.ok) {
        throw new Error("Failed to fetch workspace members.")
      }

      const { data } = await response.json()

      return data
    }
  })

  return { members, isLoadingMembers }
}