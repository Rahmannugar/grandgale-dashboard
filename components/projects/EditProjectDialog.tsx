// src/features/projects/components/edit-project-dialog.tsx
"use client"

import { useState } from "react"
import { useUpdateProject } from "@/lib/hooks/useProjects"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function EditProjectDialog({
  id,
  initialTitle
}: {
  id: string
  initialTitle: string
}) {
  const [title, setTitle] = useState(initialTitle)
  const { mutate, isPending } = useUpdateProject()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>

        <Input
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <Button
          disabled={!title || isPending}
          onClick={() => mutate({ id, title })}
        >
          Save
        </Button>
      </DialogContent>
    </Dialog>
  )
}
