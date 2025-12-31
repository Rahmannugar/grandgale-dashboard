// src/features/projects/components/delete-project-button.tsx
"use client"

import { useDeleteProject } from "@/lib/hooks/useProjects"
import { Button } from "@/components/ui/button"

import { Trash2 } from "lucide-react"

export function DeleteProjectButton({ id }: { id: string }) {
  const { mutate, isPending } = useDeleteProject()

  return (
    <Button
      size="icon"
      variant="ghost"
      className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
      disabled={isPending}
      onClick={() => mutate(id)}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  )
}
