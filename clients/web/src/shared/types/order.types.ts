export type OrderStatus = 'open' | 'in_progress' | 'completed' | 'cancelled'

export type Order = {
  id: string
  title: string
  description: string
  budget: number
  status: OrderStatus
  customerId: string
  freelancerId?: string
  createdAt: string
  deadline?: string
}