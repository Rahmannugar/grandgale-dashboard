import {  useMutation, useQueryClient } from "@tanstack/react-query"
import { projectsApi } from "../services/service"
import { toast } from "sonner"

export function useCreateSubtask() {
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
    }) => projectsApi.createSubtask(projectId, taskId, title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      toast.success("Subtask created successfully")
    }
  })
}

export function useUpdateSubtask() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      projectId,
      taskId,
      subtaskId,
      title
    }: {
      projectId: string
      taskId: string
      subtaskId: string
      title: string
    }) =>
      projectsApi.updateSubtask(projectId, taskId, subtaskId, title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      toast.success("Subtask updated successfully")
    }
  })
}

export function useDeleteSubtask() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      projectId,
      taskId,
      subtaskId
    }: {
      projectId: string
      taskId: string
      subtaskId: string
    }) =>
      projectsApi.deleteSubtask(projectId, taskId, subtaskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      toast.success("Subtask deleted successfully")
    }
  })
}
