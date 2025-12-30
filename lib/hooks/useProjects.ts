import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { projectsApi } from "../services/service"
import { Project } from "../types/types"

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
    }
  })
}

export function useDeleteProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => projectsApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    }
  })
}
