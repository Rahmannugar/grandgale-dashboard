// src/features/projects/components/delete-subtask-button.tsx
"use client"

import { useDeleteSubtask } from "@/lib/hooks/useSubTasks"
import { Button } from "@/components/ui/button"

import { Trash2 } from "lucide-react"

export function DeleteSubtaskButton({
  projectId,
  taskId,
  subtaskId
}: {
  projectId: string
  taskId: string
  subtaskId: string
}) {
  const { mutate, isPending } = useDeleteSubtask()

  return (
    <Button
      size="icon"
      variant="ghost"
      className="h-6 w-6 text-destructive hover:bg-destructive/10 hover:text-destructive"
      disabled={isPending}
      onClick={() => mutate({ projectId, taskId, subtaskId })}
    >
      <Trash2 className="h-3 w-3" />
    </Button>
  )
}
