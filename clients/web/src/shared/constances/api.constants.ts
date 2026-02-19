// api.constants.ts
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    GOOGLE: '/auth/google',
  },
  USERS: {
    PROFILE: '/users/profile',
    UPDATE: '/users/update',
    UPLOAD_AVATAR: '/users/avatar',
  },
  PROJECTS: {
    LIST: '/projects',
    CREATE: '/projects',
    DETAIL: (id: string) => `/projects/${id}`,
    UPDATE: (id: string) => `/projects/${id}`,
    DELETE: (id: string) => `/projects/${id}`,
  },
  TASKS: {
    LIST: (projectId: string) => `/projects/${projectId}/tasks`,
    CREATE: (projectId: string) => `/projects/${projectId}/tasks`,
    UPDATE: (id: string) => `/tasks/${id}`,
    DELETE: (id: string) => `/tasks/${id}`,
  },
  ORDERS: {
    LIST: '/orders',
    CREATE: '/orders',
    DETAIL: (id: string) => `/orders/${id}`,
    RESPOND: (id: string) => `/orders/${id}/respond`,
  },
  MESSENGER: {
    CHATS: '/chats',
    MESSAGES: (chatId: string) => `/chats/${chatId}/messages`,
  },
} as const

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const