// src/features/projects/components/tasks-list.tsx
"use client"

import { Task } from "@/lib/types/types"
import { EditTaskDialog } from "./EditTaskDialog"
import { DeleteTaskButton } from "./DeleteTaskButton"

export function TasksList({
  projectId,
  tasks
}: {
  projectId: string
  tasks: Task[]
}) {
  return (
    <div className="mt-3 space-y-2 pl-4">
      {tasks.map(task => (
        <div
          key={task.id}
          className="rounded-md border p-2 flex justify-between items-center"
        >
          <span>{task.title}</span>
          <div className="flex gap-2">
            <EditTaskDialog
              projectId={projectId}
              task={task}
            />
            <DeleteTaskButton
              projectId={projectId}
              taskId={task.id}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
