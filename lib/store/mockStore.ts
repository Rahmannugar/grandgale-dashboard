import { Project, Subtask, Task } from "../types/types"
import { ProjectsSchema } from "../schema/schema"
import { deriveStatus } from "../utils/statusUtils"

class MockDB {
  private projects: Project[]

  constructor() {
    this.projects = ProjectsSchema.parse([
      {
        id: "project-1",
        title: "Admin Dashboard",
        status: "done",
        tasks: [
          {
            id: "task-1",
            title: "Project setup",
            status: "done",
            subtasks: [
              {
                id: "subtask-1",
                title: "Init Project",
                status: "done"
              }
            ]
          }
        ]
      }
    ])
  }

  getProjects() {
    return this.projects
  }

  createProject(title: string): Project {
    const project: Project = {
      id: crypto.randomUUID(),
      title,
      status: "todo",
      tasks: []
    }
    this.projects = [...this.projects, project]
    return project
  }

  updateProject(id: string, title: string): Project | undefined {
    this.projects = this.projects.map(p =>
      p.id === id ? { ...p, title } : p
    )
    return this.projects.find(p => p.id === id)
  }

  deleteProject(id: string) {
    this.projects = this.projects.filter(p => p.id !== id)
  }

  addTask(projectId: string, title: string): Task {
    const task: Task = {
      id: crypto.randomUUID(),
      title,
      status: "todo",
      subtasks: []
    }
    this.projects = this.projects.map(p => {
      if (p.id !== projectId) return p
      const updatedTasks = [...p.tasks, task]
      return {
        ...p,
        tasks: updatedTasks,
        status: deriveStatus(updatedTasks.map(t => t.status))
      }
    })
    return task
  }

  updateTask(projectId: string, taskId: string, title: string) {
    this.projects = this.projects.map(p =>
      p.id === projectId
        ? {
            ...p,
            tasks: p.tasks.map(t => (t.id === taskId ? { ...t, title } : t))
          }
        : p
    )
  }

  deleteTask(projectId: string, taskId: string) {
    this.projects = this.projects.map(p => {
      if (p.id !== projectId) return p
      const updatedTasks = p.tasks.filter(t => t.id !== taskId)
      return {
        ...p,
        tasks: updatedTasks,
        status: deriveStatus(updatedTasks.map(t => t.status))
      }
    })
  }

  addSubtask(projectId: string, taskId: string, title: string): Subtask {
    const subtask: Subtask = {
      id: crypto.randomUUID(),
      title,
      status: "todo"
    }
    this.projects = this.projects.map(p => {
      if (p.id !== projectId) return p
      const updatedTasks = p.tasks.map(t => {
        if (t.id !== taskId) return t
        const updatedSubtasks = [...t.subtasks, subtask]
        return {
          ...t,
          subtasks: updatedSubtasks,
          status: deriveStatus(updatedSubtasks.map(s => s.status))
        }
      })
      return {
        ...p,
        tasks: updatedTasks,
        status: deriveStatus(updatedTasks.map(t => t.status))
      }
    })
    return subtask
  }

  updateSubtask(
    projectId: string,
    taskId: string,
    subtaskId: string,
    title: string
  ) {
    this.projects = this.projects.map(p =>
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

  deleteSubtask(projectId: string, taskId: string, subtaskId: string) {
    this.projects = this.projects.map(p => {
      if (p.id !== projectId) return p
      const updatedTasks = p.tasks.map(t => {
        if (t.id !== taskId) return t
        const updatedSubtasks = t.subtasks.filter(s => s.id !== subtaskId)
        return {
          ...t,
          subtasks: updatedSubtasks,
          status: deriveStatus(updatedSubtasks.map(s => s.status))
        }
      })
      return {
        ...p,
        tasks: updatedTasks,
        status: deriveStatus(updatedTasks.map(t => t.status))
      }
    })
  }

  toggleSubtaskStatus(projectId: string, taskId: string, subtaskId: string) {
    this.projects = this.projects.map(p => {
      if (p.id !== projectId) return p
      const tasks = p.tasks.map(t => {
        if (t.id !== taskId) return t
        const subtasks = t.subtasks.map(s =>
          s.id === subtaskId
            ? {
                ...s,
                status: (s.status === "done" ? "todo" : "done") as Subtask["status"]
              }
            : s
        )
        return {
          ...t,
          subtasks,
          status: deriveStatus(subtasks.map(s => s.status as Subtask["status"]))
        }
      })
      return {
        ...p,
        tasks,
        status: deriveStatus(tasks.map(t => t.status as Task["status"]))
      }
    })
  }
}

export const db = new MockDB()

