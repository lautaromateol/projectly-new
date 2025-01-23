"use client"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { InferResponseType } from "hono"
import { zodResolver } from "@hookform/resolvers/zod"
import { useUpdateTask } from "@/features/tasks/api/use-update-task"
import { updateTaskSchema } from "@/features/tasks/schemas"
import { TaskPriority, TaskStatus } from "@prisma/client/edge"
import { useUpdateTaskModal } from "@/features/tasks/hooks/use-update-task-modal"
import { useGetMembers } from "@/features/members/api/use-get-members"
import { MemberAvatar } from "@/features/members/components/member-avatar"
import { client } from "@/lib/client"
import { snakeCaseToTitleCase } from "@/lib/utils"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/date-picker"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

type Task = InferResponseType<typeof client.api.tasks[":taskId"]["$get"], 200>["data"]

export function UpdateTaskForm({ task }: { task: Task }) {

  const { close } = useUpdateTaskModal()

  const form = useForm<z.infer<typeof updateTaskSchema>>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      ...task,
      dueDate: new Date(task.dueDate),
      priority: task.priority ?? undefined,
      memberId: task.memberId ?? undefined
    }
  })

  const { members, isLoadingMembers } = useGetMembers()

  const { updateTask, isUpdatingTask } = useUpdateTask({ taskId: task.id })

  function onSubmit(data: z.infer<typeof updateTaskSchema>) {
    updateTask(data, {
      onSuccess: () => close()
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task name</FormLabel>
              <FormControl>
                <Input placeholder="Finish authentication flow" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task description</FormLabel>
              <FormControl>
                <Textarea placeholder="Implement Clerk auth." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task due date</FormLabel>
              <FormControl>
                <DatePicker
                  value={field.value ?? undefined}
                  onChange={field.onChange}
                  modal
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={TaskStatus.TO_DO}>
                    <Badge variant={TaskStatus.TO_DO}>{snakeCaseToTitleCase(TaskStatus.TO_DO)}</Badge>
                  </SelectItem>
                  <SelectItem value={TaskStatus.IN_PROGRESS}>
                    <Badge variant={TaskStatus.IN_PROGRESS}>{snakeCaseToTitleCase(TaskStatus.IN_PROGRESS)}</Badge>
                  </SelectItem>
                  <SelectItem value={TaskStatus.IN_REVIEW}>
                    <Badge variant={TaskStatus.IN_REVIEW}>{snakeCaseToTitleCase(TaskStatus.IN_REVIEW)}</Badge>
                  </SelectItem>
                  <SelectItem value={TaskStatus.DONE}>
                    <Badge variant={TaskStatus.DONE}>{snakeCaseToTitleCase(TaskStatus.DONE)}</Badge>
                  </SelectItem>
                  <SelectItem value={TaskStatus.OVERDUE}>
                    <Badge variant={TaskStatus.OVERDUE}>{snakeCaseToTitleCase(TaskStatus.OVERDUE)}</Badge>
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={TaskPriority.LOW}>
                    <p className="text-sm font-medium text-emerald-500">{snakeCaseToTitleCase(TaskPriority.LOW)}</p>
                  </SelectItem>
                  <SelectItem value={TaskPriority.MEDIUM}>
                    <p className="text-sm font-medium text-amber-500">{snakeCaseToTitleCase(TaskPriority.MEDIUM)}</p>
                  </SelectItem>
                  <SelectItem value={TaskPriority.HIGH}>
                    <p className="text-sm font-medium text-rose-500">{snakeCaseToTitleCase(TaskPriority.HIGH)}</p>
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="memberId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assigned to</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  {isLoadingMembers ? (
                    <Skeleton className="h-9 w-full" />
                  ) : (
                    <SelectTrigger>
                      <SelectValue placeholder="Select a workspace member" />
                    </SelectTrigger>
                  )}
                </FormControl>
                <SelectContent>
                  {members?.map((member) => (
                    <SelectItem value={member.id} key={member.id}>
                      <div className="flex items-center gap-x-2">
                        <MemberAvatar
                          name={member.name}
                          imageUrl={member.imageUrl ?? ""}
                        />
                        <p className="text-sm font-medium">{member.name}</p>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={isUpdatingTask}
        >
          Save Changes
        </Button>
      </form>
    </Form>
  )
}
