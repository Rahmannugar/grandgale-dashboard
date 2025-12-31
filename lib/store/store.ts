import { create } from "zustand"

type AppState = {
  openProjectId: string | null
  openTaskId: string | null
  toggleProject: (id: string) => void
  toggleTask: (id: string) => void
}

export const useStore = create<AppState>(set => ({
  openProjectId: null,
  openTaskId: null,

  toggleProject: id =>
    set(state => ({
      openProjectId: state.openProjectId === id ? null : id,
      openTaskId: null
    })),

  toggleTask: id =>
    set(state => ({
      openTaskId: state.openTaskId === id ? null : id
    }))
}))
