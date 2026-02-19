// api.types.ts
export type ApiStatus = 'idle' | 'loading' | 'success' | 'error'

export type ApiError = {
  code: string
  message: string
  details?: unknown
}

export type PaginationParams = {
  page: number
  limit: number
}

export type PaginatedResponse<T> = {
  data: T[]
  total: number
  page: number
  limit: number
}