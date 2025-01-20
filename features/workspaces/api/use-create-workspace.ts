import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "@/lib/client";

type RequestType = InferRequestType<typeof client.api.workspaces.$post>
type ResponseType = InferResponseType<typeof client.api.workspaces.$post, 200>["data"]

export function useCreateWorkspace() {
  const queryClient = useQueryClient()

  const { mutate: createWorkspace, isPending: isCreatingWorkspace } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async({ form }) => {
      const response = await client.api.workspaces.$post({
        form
      })

      if(!response.ok) {
        throw new Error("Failed to create workspace.")
      }

      const { data } = await response.json()

      return data
    },
    onSuccess: (data) => {
      toast.success(`${data.name} created.`)
      queryClient.invalidateQueries({ queryKey: ["workspaces"] })
    }, 
    onError: (error) => toast.error(error.message)
  })

  return { createWorkspace, isCreatingWorkspace }
}