"use client"
import Image from "next/image"
import { z } from "zod"
import { useRef } from "react"
import { ImageIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { Project } from "@prisma/client/edge"
import { zodResolver } from "@hookform/resolvers/zod"
import { useUpdateProject } from "@/features/projects/api/use-update-project"
import { useUpdateProjectModal } from "@/features/projects/hooks/use-update-project-modal"
import { updateWorskspaceSchema } from "@/features/projects/schemas"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface UpdateProjectFormProps {
  project: Project
}

export function UpdateProjectForm({ project }: UpdateProjectFormProps) {

  const inputRef = useRef<HTMLInputElement>(null)

  const form = useForm<z.infer<typeof updateWorskspaceSchema>>({
    defaultValues: {
      name: project.name,
      imageUrl: project.imageUrl ?? ""
    },
    resolver: zodResolver(updateWorskspaceSchema)
  })

  const { updateProject, isUpdatingProject } = useUpdateProject()

  const { close } = useUpdateProjectModal()

  function onSubmit(data: z.infer<typeof updateWorskspaceSchema>) {
    updateProject({
      ...data,
      imageUrl: data.imageUrl instanceof File ? data.imageUrl : ""
    }, {
      onSuccess: () => close()
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
                    alt="Project Image"
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
                  <p className="text-sm">Project Image</p>
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
                  disabled={isUpdatingProject}
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
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isUpdatingProject} type="submit">Save Changes</Button>
      </form>
    </Form>
  )
}
