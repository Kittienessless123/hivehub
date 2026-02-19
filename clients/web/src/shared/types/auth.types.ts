// auth.types.ts
export type UserRole = 'guest' | 'user' | 'freelancer' | 'customer' | 'admin'

export type User = {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  createdAt: string
}

export type AuthState = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}