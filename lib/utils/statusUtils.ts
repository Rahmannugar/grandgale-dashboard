import { Status } from "@/lib/types/types"

export function deriveStatus(statuses: Status[]): Status {
  if (statuses.length === 0) return "todo"
  if (statuses.every(s => s === "done")) return "done"
  if (statuses.some(s => s === "in_progress" || s === "done"))
    return "in_progress"
  return "todo"
}
