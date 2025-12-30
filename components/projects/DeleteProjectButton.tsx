// src/features/projects/components/delete-project-button.tsx
"use client"

import { useDeleteProject } from "@/lib/hooks/useProjects"
import { Button } from "@/components/ui/button"

export function DeleteProjectButton({ id }: { id: string }) {
  const { mutate, isPending } = useDeleteProject()

  return (
    <Button
      size="sm"
      variant="destructive"
      disabled={isPending}
      onClick={() => mutate(id)}
    >
      Delete
    </Button>
  )
}
