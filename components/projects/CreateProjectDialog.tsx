// src/features/projects/components/create-project-dialog.tsx
"use client"

import { useState } from "react"
import { useCreateProject } from "@/lib/hooks/useProjects"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function CreateProjectDialog() {
  const [title, setTitle] = useState("")
  const { mutate, isPending } = useCreateProject()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Project</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Project title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <Button
          disabled={!title || isPending}
          onClick={() => {
            mutate(title)
            setTitle("")
          }}
        >
          Create
        </Button>
      </DialogContent>
    </Dialog>
  )
}
