"use client"

import { useState } from "react"
import { useCreateSubtask } from "@/lib/hooks/useSubTasks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function CreateSubtaskInput({
  projectId,
  taskId
}: {
  projectId: string
  taskId: string
}) {
  const [title, setTitle] = useState("")
  const { mutate } = useCreateSubtask()

  return (
    <form
      className="mt-2 flex gap-2 pl-4"
      onSubmit={(e) => {
        e.preventDefault()
        mutate({ projectId, taskId, title })
        setTitle("")
      }}
    >
      <Input
        placeholder="New subtask"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <Button
        size="sm"
        type="submit"
      >
        Add
      </Button>
    </form>
  )
}
