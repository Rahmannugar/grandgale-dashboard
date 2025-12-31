"use client"

import { useProjects } from "@/lib/hooks/useProjects"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"
import { CreateProjectDialog } from "./CreateProjectDialog"
import { EditProjectDialog } from "./EditProjectDialog"
import { DeleteProjectButton } from "./DeleteProjectButton"
import { TasksList } from "../tasks/TasksList"
import { CreateTaskDialog } from "../tasks/CreateTaskDialog"
import { useStore } from "@/lib/store/store"

export function ProjectsList() {
  const { data, isLoading } = useProjects()

  const openProjectId = useStore(s => s.openProjectId)
  const toggleProject = useStore(s => s.toggleProject)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 text-sm text-muted-foreground animate-pulse">
        Loading projects...
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
           <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
           <p className="text-sm text-muted-foreground">Manage your ongoing projects and tasks.</p>
        </div>
        <CreateProjectDialog />
      </div>

      <div className="grid gap-4">
        {data?.map(project => {
          const isOpen = openProjectId === project.id

          return (
            <Card 
              key={project.id} 
              className={`transition-all duration-200 border-l-4 ${isOpen ? 'border-l-primary shadow-md' : 'border-l-transparent hover:border-l-primary/50 hover:shadow-sm'}`}
            >
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                   <div
                    className="flex flex-1 items-center gap-3 cursor-pointer select-none group"
                    onClick={() => toggleProject(project.id)}
                  >
                    <div className={`transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}>
                       <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                    </div>
                    <CardTitle className="text-base font-medium group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <Badge variant={project.status === 'done' ? 'default' : 'secondary'} className="capitalize opacity-90">
                      {project.status.replace("_", " ")}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 pl-4">
                    <EditProjectDialog
                      id={project.id}
                      initialTitle={project.title}
                    />
                    <DeleteProjectButton id={project.id} />
                  </div>
                </div>

                {isOpen && (
                  <div className="pt-4 pl-2 animate-in slide-in-from-top-2 duration-200">
                    <div className="pl-6 border-l-2 border-border/50 space-y-4">
                      <TasksList
                        projectId={project.id}
                        tasks={project.tasks}
                      />
                      <CreateTaskDialog projectId={project.id} />
                    </div>
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
