"use client"

import { useState } from "react"
import { Subtask } from "@/lib/types/types"
import { useUpdateSubtask } from "@/lib/hooks/useSubTasks"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil } from "lucide-react"

export function EditSubtaskDialog({
  projectId,
  taskId,
  subtask
}: {
  projectId: string
  taskId: string
  subtask: Subtask
}) {
  const [title, setTitle] = useState(subtask.title)
  const { mutate, isPending } = useUpdateSubtask()

  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="h-6 w-6 text-muted-foreground hover:text-foreground">
          <Pencil className="h-3 w-3" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Subtask</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            mutate(
              { projectId, taskId, subtaskId: subtask.id, title },
              { onSuccess: () => setOpen(false) }
            )
          }}
          className="space-y-4"
        >
          <Input value={title} onChange={e => setTitle(e.target.value)} />
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!title || isPending}
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
