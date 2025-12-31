import { useMutation, useQueryClient } from "@tanstack/react-query"
import { projectsApi } from "../services/service"
import { toast } from "sonner"

export function useSubtaskToggleStatus() {
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
      projectsApi.toggleSubtaskStatus(
        projectId,
        taskId,
        subtaskId
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      toast.success("Status updated")
    }
  })
}
