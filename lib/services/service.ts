import { apiClient } from "@/lib/client/apiClient"
import { Project } from "../types/types"
import { addTask, getProjects, removeTask, setProjects, updateTask } from "../store/mockStore"

const delay = (ms = 500) =>
  new Promise(resolve => setTimeout(resolve, ms))

export const projectsApi = {
  async getAll(): Promise<Project[]> {
    await delay()
    return getProjects()
  },

  async create(title: string): Promise<Project> {
    await delay()

    const project: Project = {
      id: crypto.randomUUID(),
      title,
      status: "todo",
      tasks: []
    }

    setProjects([...getProjects(), project])
    return project
  },

  async update(id: string, title: string): Promise<Project> {
    await delay()

    const updated = getProjects().map(p =>
      p.id === id ? { ...p, title } : p
    )

    setProjects(updated)
    return updated.find(p => p.id === id)!
  },

  async remove(id: string): Promise<void> {
    await delay()
    setProjects(getProjects().filter(p => p.id !== id))
  },

  async createTask(projectId: string, title: string) {
    await delay()
    return addTask(projectId, title)
  },

  async updateTask(
    projectId: string,
    taskId: string,
    title: string
  ) {
    await delay()
    updateTask(projectId, taskId, title)
  },

  async deleteTask(projectId: string, taskId: string) {
    await delay()
    removeTask(projectId, taskId)
  }
}
