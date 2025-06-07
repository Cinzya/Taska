export interface Task {
  id: string
  title: string
  deadline: string // ISO string
  completed: boolean
  createdAt: string // ISO string
  completedAt?: string // ISO string
}
