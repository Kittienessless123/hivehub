// task.types.ts
export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done'

export type TaskPriority = 'low' | 'medium' | 'high' | 'critical'

export type Task = {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  projectId: string
  assigneeId?: string
  dueDate?: string
  createdAt: string
}