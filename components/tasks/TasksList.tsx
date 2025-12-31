"use client"

import { Task } from "@/lib/types/types"
import { EditTaskDialog } from "./EditTaskDialog"
import { DeleteTaskButton } from "./DeleteTaskButton"
import { SubtasksList } from "../subtasks/SubTasksList"
import { CreateSubtaskInput } from "../subtasks/CreateSubTaskInput"
import { useStore } from "@/lib/store/store"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Circle, CheckCircle2 } from "lucide-react"

export function TasksList({
  projectId,
  tasks
}: {
  projectId: string
  tasks: Task[]
}) {
  const openTaskId = useStore(s => s.openTaskId)
  const toggleTask = useStore(s => s.toggleTask)

  return (
    <div className="space-y-2">
      {tasks.length === 0 && (
         <p className="text-sm text-muted-foreground italic py-2">No tasks created yet.</p>
      )}
      {tasks.map(task => {
        const isOpen = openTaskId === task.id
        const isDone = task.status === 'done'

        return (
          <div key={task.id} className="group rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between p-2">
               <div 
                 className="flex flex-1 items-center gap-3 cursor-pointer select-none"
                 onClick={() => toggleTask(task.id)}
               >
                 <div className={`transition-transform duration-200 text-muted-foreground ${isOpen ? 'rotate-90' : ''}`}>
                   <ChevronRight className="size-4" />
                 </div>
                 
                 <div className="flex items-center gap-2">
                    {isDone ? (
                      <CheckCircle2 className="size-4 text-primary" />
                    ) : (
                      <Circle className="size-4 text-muted-foreground" />
                    )}
                    <span className={`text-sm font-medium ${isDone ? 'line-through text-muted-foreground' : ''} break-all`}>
                      {task.title}
                    </span>
                 </div>

                 {task.subtasks.length > 0 && (
                   <Badge variant="outline" className="text-[10px] h-5 px-1.5 text-muted-foreground">
                      {task.subtasks.filter(s => s.status === 'done').length}/{task.subtasks.length}
                   </Badge>
                 )}
               </div>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <EditTaskDialog projectId={projectId} task={task} />
                <DeleteTaskButton
                  projectId={projectId}
                  taskId={task.id}
                />
              </div>
            </div>

            {isOpen && (
              <div className="border-t bg-muted/30 p-3 animate-in slide-in-from-top-1 duration-200">
                <div className="pl-4 space-y-2">
                   <SubtasksList
                    projectId={projectId}
                    taskId={task.id}
                    subtasks={task.subtasks}
                  />
                  <CreateSubtaskInput
                    projectId={projectId}
                    taskId={task.id}
                  />
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
