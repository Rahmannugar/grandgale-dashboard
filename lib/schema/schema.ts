import { z } from "zod"

export const StatusSchema = z.enum(["todo", "in_progress", "done"])

export const SubtaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: StatusSchema
})

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: StatusSchema,
  subtasks: z.array(SubtaskSchema)
})

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: StatusSchema,
  tasks: z.array(TaskSchema)
})

export const ProjectsSchema = z.array(ProjectSchema)
