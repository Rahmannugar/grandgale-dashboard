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
  const [open, setOpen] = useState(false)
  const { mutate, isPending } = useCreateProject()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Project</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            mutate(title, {
              onSuccess: () => {
                setOpen(false)
                setTitle("")
              }
            })
          }}
          className="space-y-4"
        >
          <Input
            placeholder="Project title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <div className="flex justify-end">
            <Button type="submit" disabled={!title || isPending}>
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
