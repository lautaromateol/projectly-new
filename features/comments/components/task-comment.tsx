import { useState } from "react";
import { InferResponseType } from "hono";
import { formatDistanceToNow } from "date-fns"
import { useUpdateComment } from "@/features/comments/api/use-update-comment";
import { useDeleteComment } from "@/features/comments/api/use-delete-comment";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { client } from "@/lib/client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type Comment = InferResponseType<typeof client.api.comments[":taskId"]["$get"], 200>["data"][0]

export function TaskComment({ comment }: { comment: Comment }) {

  const [editMode, setEditMode] = useState(false)
  const [content, setContent] = useState(comment.content)

  const { updateComment, isUpdatingComment } = useUpdateComment({ commentId: comment.id })
  const { deleteComment, isDeletingComment } = useDeleteComment({ commentId: comment.id })

  const isPending = isUpdatingComment || isDeletingComment

  function handleCancelEdit() {
    setEditMode(false)
    setContent(comment.content)
  }

  function handleSave() {
    if (content.trim().length === 0) return
    updateComment({
      content
    }, {
      onSuccess: (data) => {
        setEditMode(false)
        setContent(data.content)
      }
    })
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-x-2">
        <MemberAvatar
          name={comment.member.name}
          imageUrl={comment.member.imageUrl ?? ""}
        />
        <p className="text-sm font-medium text-slate-800">{comment.member.name}</p>
        <p className="text-sm font-medium text-muted-foreground">{formatDistanceToNow(comment.createdAt, { addSuffix: true })}</p>
      </div>
      {editMode ? (
        <div className="space-y-2">
          <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
          <div className="flex items-center gap-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancelEdit}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isPending}
            >
              Save Changes
            </Button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-sm font-medium text-slate-800 px-8">{comment.content}</p>
          <div className="flex items-center gap-x-2 px-8 text-sm text-muted-foreground font-medium">
            <button onClick={() => setEditMode(true)} disabled={isPending}>Edit</button>
            <button onClick={() => deleteComment()} disabled={isPending}>Delete</button>
          </div>
        </>
      )}
    </div>
  )
}
