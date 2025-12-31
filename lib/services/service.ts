import { Project } from "../types/types"
import { db } from "../store/mockStore"

const delay = (ms = 500) =>
  new Promise(resolve => setTimeout(resolve, ms))

export const projectsApi = {
  async getAll(): Promise<Project[]> {
    await delay()
    return db.getProjects()
  },

  async create(title: string): Promise<Project> {
    await delay()
    return db.createProject(title)
  },

  async update(id: string, title: string): Promise<Project> {
    await delay()
    const updated = db.updateProject(id, title)
    if (!updated) throw new Error("Project not found")
    return updated
  },

  async remove(id: string): Promise<void> {
    await delay()
    db.deleteProject(id)
  },

  async createTask(projectId: string, title: string) {
    await delay()
    return db.addTask(projectId, title)
  },

  async updateTask(
    projectId: string,
    taskId: string,
    title: string
  ) {
    await delay()
    db.updateTask(projectId, taskId, title)
  },

  async deleteTask(projectId: string, taskId: string) {
    await delay()
    db.deleteTask(projectId, taskId)
  },

  async createSubtask(projectId: string, taskId: string, title: string) {
    await delay()
    return db.addSubtask(projectId, taskId, title)
  },

  async updateSubtask(
    projectId: string,
    taskId: string,
    subtaskId: string,
    title: string
  ) {
    await delay()
    db.updateSubtask(projectId, taskId, subtaskId, title)
  },

  async deleteSubtask(
    projectId: string,
    taskId: string,
    subtaskId: string
  ) {
    await delay()
    db.deleteSubtask(projectId, taskId, subtaskId)
  },

  async toggleSubtaskStatus(
    projectId: string,
    taskId: string,
    subtaskId: string
  ) {
    await delay()
    db.toggleSubtaskStatus(projectId, taskId, subtaskId)
  }
}

