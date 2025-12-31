import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { projectsApi } from "../services/service"
import { Project } from "../types/types"
import { toast } from "sonner"

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: projectsApi.getAll
  })
}

export function useCreateProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (title: string) => projectsApi.create(title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      toast.success("Project created successfully")
    }
  })
}

export function useUpdateProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      title
    }: {
      id: string
      title: string
    }) => projectsApi.update(id, title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      toast.success("Project updated successfully")
    }
  })
}

export function useDeleteProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => projectsApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      toast.success("Project deleted successfully")
    }
  })
}
