import {  useMutation, useQueryClient } from "@tanstack/react-query"
import { projectsApi } from "../services/service"

export function useCreateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      projectId,
      title
    }: {
      projectId: string
      title: string
    }) => projectsApi.createTask(projectId, title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    }
  })
}

export function useUpdateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      projectId,
      taskId,
      title
    }: {
      projectId: string
      taskId: string
      title: string
    }) => projectsApi.updateTask(projectId, taskId, title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    }
  })
}

export function useDeleteTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      projectId,
      taskId
    }: {
      projectId: string
      taskId: string
    }) => projectsApi.deleteTask(projectId, taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    }
  })
}
