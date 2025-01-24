import { useState } from "react"
import { MessageSquare } from "lucide-react"
import { useUser } from "@clerk/nextjs"
import { useCreateComment } from "@/features/comments/api/use-create-comment"
import { useGetComments } from "@/features/comments/api/use-get-comments"
import { MemberAvatar } from "@/features/members/components/member-avatar"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { TaskComment } from "@/features/comments/components/task-comment"

export function TaskCommentSection({ taskId }: { taskId: string }) {

  const [editMode, setEditMode] = useState(false)
  const [content, setContent] = useState("")

  const { comments } = useGetComments({ taskId })
  const { createComment, isCreatingComment } = useCreateComment({ taskId })

  function handleCancelEdit() {
    setEditMode(false)
    setContent("")
  }

  function handleSave() {
    if (content.trim().length === 0) return
    createComment({
      content
    }, {
      onSuccess: () => {
        setEditMode(false)
        setContent("")
      }
    })
  }

  const { user } = useUser()

  return (
    <div className="flex flex-col gap-y-4 p-2">
      <div className="flex items-center gap-x-2">
        <MessageSquare className="size-4 text-muted-foreground" />
        <p className="text-sm font-semibold text-muted-foreground">Comments</p>
      </div>
      <div className="flex gap-x-4">
        {user && (
          <MemberAvatar
            name={user.fullName!}
            imageUrl={user?.imageUrl ?? ""}
          />
        )}
        {editMode ? (
          <div className="space-y-2 w-full">
            <Textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full" />
            <div className="flex items-center gap-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleCancelEdit}
                disabled={isCreatingComment}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={isCreatingComment}
              >
                Submit Comment
              </Button>
            </div>
          </div>
        ) : (
          <div role="button" onClick={() => setEditMode(true)} className="h-16 w-full border border-slate-200 rounded p-4 hover:bg-slate-100">
            <p className="text-sm font-light text-muted-foreground">Add a comment...</p>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-y-2">
        {comments?.map((comment) => (
          <TaskComment comment={comment} key={comment.id} />
        ))}
      </div>
    </div>
  )
}
