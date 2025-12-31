"use client"

import { useDeleteTask } from "@/lib/hooks/useTasks"
import { Button } from "@/components/ui/button"

import { Trash2 } from "lucide-react"

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
      size="icon"
      variant="ghost"
      className="h-7 w-7 text-destructive hover:bg-destructive/10 hover:text-destructive"
      disabled={isPending}
      onClick={() => mutate({ projectId, taskId })}
    >
      <Trash2 className="h-3.5 w-3.5" />
    </Button>
  )
}
