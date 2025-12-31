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
import { Pencil } from "lucide-react"

export function EditProjectDialog({
  id,
  initialTitle
}: {
  id: string
  initialTitle: string
}) {
  const [title, setTitle] = useState(initialTitle)
  const { mutate, isPending } = useUpdateProject()

  const [open, setOpen] = useState(false)
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            mutate(
              { id, title },
              {
                onSuccess: () => setOpen(false)
              }
            )
          }}
          className="space-y-4"
        >
          <Input
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <div className="flex justify-end">
            <Button type="submit" disabled={!title || isPending}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

