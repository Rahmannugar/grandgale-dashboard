import { Project } from "../types/types"
import { ProjectsSchema } from "../schema/schema"

let projects: Project[] = ProjectsSchema.parse([
  {
    id: "project-1",
    title: "Admin Dashboard",
    status: "todo",
    tasks: [
      {
        id: "task-1",
        title: "Project setup",
        status: "done",
        subtasks: [
          {
            id: "subtask-1",
            title: "Init Next.js",
            status: "done"
          }
        ]
      }
    ]
  }
])

export function getProjects() {
  return projects
}

export function setProjects(next: Project[]) {
  projects = next
}
