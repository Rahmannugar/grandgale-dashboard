"use client"

import { useState } from "react"
import { useProjects } from "@/lib/hooks/useProjects"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreateProjectDialog } from "./CreateProjectDialog"
import { EditProjectDialog } from "./EditProjectDialog"
import { DeleteProjectButton } from "./DeleteProjectButton"
import { TasksList } from "../tasks/TasksList"
import { CreateTaskDialog } from "../tasks/CreateTaskDialog"

export function ProjectsList() {
  const { data, isLoading } = useProjects()
  const [openProjectId, setOpenProjectId] = useState<string | null>(null)

  if (isLoading) {
    return (
      <div className="text-sm text-muted-foreground">
        Loading projects…
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Projects</h2>
        <CreateProjectDialog />
      </div>

      <div className="space-y-4">
        {data?.map(project => {
          const isOpen = openProjectId === project.id

          return (
            <Card key={project.id}>
              <CardHeader className="space-y-3">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() =>
                    setOpenProjectId(isOpen ? null : project.id)
                  }
                >
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

                {isOpen && (
                  <div className="pt-2">
                    <TasksList
                      projectId={project.id}
                      tasks={project.tasks}
                    />
                    <CreateTaskDialog projectId={project.id} />
                  </div>
                )}
              </CardHeader>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
