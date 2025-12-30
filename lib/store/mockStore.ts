import { Project, Subtask, Task } from "../types/types"
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

export function addTask(projectId: string, title: string): Task {
  const task: Task = {
    id: crypto.randomUUID(),
    title,
    status: "todo",
    subtasks: []
  }

  projects = projects.map(p =>
    p.id === projectId
      ? { ...p, tasks: [...p.tasks, task] }
      : p
  )

  return task
}

export function updateTask(
  projectId: string,
  taskId: string,
  title: string
) {
  projects = projects.map(p =>
    p.id === projectId
      ? {
          ...p,
          tasks: p.tasks.map(t =>
            t.id === taskId ? { ...t, title } : t
          )
        }
      : p
  )
}

export function removeTask(projectId: string, taskId: string) {
  projects = projects.map(p =>
    p.id === projectId
      ? {
          ...p,
          tasks: p.tasks.filter(t => t.id !== taskId)
        }
      : p
  )
}

export function addSubtask(
  projectId: string,
  taskId: string,
  title: string
): Subtask {
  const subtask: Subtask = {
    id: crypto.randomUUID(),
    title,
    status: "todo"
  }

  projects = projects.map(p =>
    p.id === projectId
      ? {
          ...p,
          tasks: p.tasks.map(t =>
            t.id === taskId
              ? { ...t, subtasks: [...t.subtasks, subtask] }
              : t
          )
        }
      : p
  )

  return subtask
}

export function updateSubtask(
  projectId: string,
  taskId: string,
  subtaskId: string,
  title: string
) {
  projects = projects.map(p =>
    p.id === projectId
      ? {
          ...p,
          tasks: p.tasks.map(t =>
            t.id === taskId
              ? {
                  ...t,
                  subtasks: t.subtasks.map(s =>
                    s.id === subtaskId ? { ...s, title } : s
                  )
                }
              : t
          )
        }
      : p
  )
}

export function removeSubtask(
  projectId: string,
  taskId: string,
  subtaskId: string
) {
  projects = projects.map(p =>
    p.id === projectId
      ? {
          ...p,
          tasks: p.tasks.map(t =>
            t.id === taskId
              ? {
                  ...t,
                  subtasks: t.subtasks.filter(s => s.id !== subtaskId)
                }
              : t
          )
        }
      : p
  )
}