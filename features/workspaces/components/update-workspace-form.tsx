"use client"
import Image from "next/image"
import { z } from "zod"
import { useRef } from "react"
import { ImageIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { Workspace } from "@prisma/client/edge"
import { zodResolver } from "@hookform/resolvers/zod"
import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace"
import { updateWorskspaceSchema } from "@/features/workspaces/schemas"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface UpdateWorkspaceFormProps {
  workspace: Workspace
}

export function UpdateWorkspaceForm({ workspace }: UpdateWorkspaceFormProps) {

  const inputRef = useRef<HTMLInputElement>(null)

  const form = useForm<z.infer<typeof updateWorskspaceSchema>>({
    defaultValues: {
      name: workspace.name,
      imageUrl: workspace.imageUrl ?? ""
    },
    resolver: zodResolver(updateWorskspaceSchema)
  })

  const { updateWorkspace, isUpdatingWorkspace } = useUpdateWorkspace({ workspaceId: workspace.id })

  function onSubmit(data: z.infer<typeof updateWorskspaceSchema>) {
    updateWorkspace({
      form: {
        ...data,
        imageUrl: data.imageUrl instanceof File ? data.imageUrl : ""
      },
      param: { workspaceId: workspace.id }
    })
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]

    if (file) {
      form.setValue("imageUrl", file)
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <div className="flex items-center gap-x-4">
              {field.value ? (
                <div className="relative rounded-md size-[72px] overflow-hidden">
                  <Image
                    src={field.value instanceof File ? URL.createObjectURL(field.value) : field.value}
                    alt="Workspace Image"
                    className="object-cover"
                    fill
                  />
                </div>
              ) : (
                <Avatar className="size-[72px] rounded-md overflow-hidden">
                  <AvatarFallback>
                    <ImageIcon />
                  </AvatarFallback>
                </Avatar>
              )}
              <div className="flex flex-col gap-y-2">
                <div className="space-y-0.1">
                  <p className="text-sm">Workspace Image</p>
                  <p className="text-sm text-muted-foreground">JPG, PNG, SVG or JPEG, max 1MB</p>
                </div>
                <input
                  className="hidden"
                  type="file"
                  accept=".jpg, .png, .jpeg, .svg"
                  ref={inputRef}
                  onChange={handleImageChange}
                />
                <Button
                  onClick={() => inputRef.current?.click()}
                  disabled={isUpdatingWorkspace}
                  type="button"
                  variant="secondary"
                  size="sm">
                  Upload Image
                </Button>
              </div>
            </div>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workspace Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isUpdatingWorkspace} type="submit">Save Changes</Button>
      </form>
    </Form>
  )
}
