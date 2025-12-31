"use client"

import { Subtask } from "@/lib/types/types"
import { Checkbox } from "@/components/ui/checkbox"
import { useSubtaskToggleStatus } from "@/lib/hooks/useSubTaskToggle"
import { EditSubtaskDialog } from "./EditSubTaskDialog"
import { DeleteSubtaskButton } from "./DeleteSubTaskButton"

export function SubtasksList({
  projectId,
  taskId,
  subtasks
}: {
  projectId: string
  taskId: string
  subtasks: Subtask[]
}) {
  const { mutate } = useSubtaskToggleStatus()

  return (
    <div className="mt-2 space-y-1 pl-4">
      {subtasks.map(s => (
        <div
          key={s.id}
          className="group flex items-center justify-between rounded-md p-1.5 text-sm hover:bg-background/80 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Checkbox
              checked={s.status === "done"}
              onCheckedChange={() =>
                mutate({
                  projectId,
                  taskId,
                  subtaskId: s.id
                })
              }
            />
            <span className={`${s.status === "done" ? "line-through text-muted-foreground" : ""} break-all`}>
              {s.title}
            </span>
          </div>

          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <EditSubtaskDialog
              projectId={projectId}
              taskId={taskId}
              subtask={s}
            />
            <DeleteSubtaskButton
              projectId={projectId}
              taskId={taskId}
              subtaskId={s.id}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
