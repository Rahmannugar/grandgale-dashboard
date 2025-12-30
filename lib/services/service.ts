// src/features/projects/services.ts
import { apiClient } from "@/lib/client/apiClient"
import { Project } from "../types/types"
import { getProjects, setProjects } from "../store/mockStore"

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
  }
}
