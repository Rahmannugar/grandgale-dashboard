"use client"

import { useState } from "react"
import { Task } from "@/lib/types/types"
import { useUpdateTask } from "@/lib/hooks/useTasks"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function EditTaskDialog({
  projectId,
  task
}: {
  projectId: string
  task: Task
}) {
  const [title, setTitle] = useState(task.title)
  const { mutate, isPending } = useUpdateTask()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <Input
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <Button
          disabled={!title || isPending}
          onClick={() =>
            mutate({ projectId, taskId: task.id, title })
          }
        >
          Save
        </Button>
      </DialogContent>
    </Dialog>
  )
}
