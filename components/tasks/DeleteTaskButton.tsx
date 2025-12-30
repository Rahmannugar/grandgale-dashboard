"use client"

import { useDeleteTask } from "@/lib/hooks/useTasks"
import { Button } from "@/components/ui/button"

export function DeleteTaskButton({
  projectId,
  taskId
}: {
  projectId: string
  taskId: string
}) {
  const { mutate, isPending } = useDeleteTask()

  return (
    <Button
      size="sm"
      variant="destructive"
      disabled={isPending}
      onClick={() => mutate({ projectId, taskId })}
    >
      Delete
    </Button>
  )
}
