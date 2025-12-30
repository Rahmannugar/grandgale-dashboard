
"use client"

import { useState } from "react"
import { useCreateTask } from "@/lib/hooks/useTasks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function CreateTaskDialog({
  projectId
}: {
  projectId: string
}) {
  const [title, setTitle] = useState("")
  const { mutate } = useCreateTask()

  return (
    <div className="mt-2 flex gap-2">
      <Input
        placeholder="New task"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <Button
        size="sm"
        onClick={() => {
          mutate({ projectId, title })
          setTitle("")
        }}
      >
        Add
      </Button>
    </div>
  )
}
