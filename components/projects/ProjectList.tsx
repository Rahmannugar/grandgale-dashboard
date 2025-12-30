// src/features/projects/components/projects-list.tsx
"use client"

import { useProjects } from "@/lib/hooks/useProjects"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreateProjectDialog } from "./CreateProjectDialog"
import { EditProjectDialog } from "./EditProjectDialog"
import { DeleteProjectButton } from "./DeleteProjectButton"

export function ProjectsList() {
  const { data, isLoading } = useProjects()

  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Loading projects…</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Projects</h2>
        <CreateProjectDialog />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map(project => (
          <Card key={project.id}>
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                  {project.title}
                </CardTitle>
                <Badge variant="secondary">
                  {project.status}
                </Badge>
              </div>

              <div className="flex gap-2">
                <EditProjectDialog
                  id={project.id}
                  initialTitle={project.title}
                />
                <DeleteProjectButton id={project.id} />
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
