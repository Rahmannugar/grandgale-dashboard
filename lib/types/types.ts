import { z } from "zod"
import {
  StatusSchema,
  SubtaskSchema,
  TaskSchema,
  ProjectSchema
} from "../schema/schema"

export type Status = z.infer<typeof StatusSchema>
export type Subtask = z.infer<typeof SubtaskSchema>
export type Task = z.infer<typeof TaskSchema>
export type Project = z.infer<typeof ProjectSchema>
