// routes.constants.ts
export const ROUTES = {
  // Public
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  
  // Profile
  PROFILE: '/profile',
  PROFILE_EDIT: '/profile/edit',
  PROFILE_SETTINGS: '/profile/settings',
  PROFILE_VIEW: (id: string) => `/profile/${id}`,
  
  // Projects
  PROJECTS: '/projects',
  PROJECT_CREATE: '/projects/create',
  PROJECT_DETAIL: (id: string) => `/projects/${id}`,
  PROJECT_EDIT: (id: string) => `/projects/${id}/edit`,
  PROJECT_TASKS: (id: string) => `/projects/${id}/tasks`,
  PROJECT_KANBAN: (id: string) => `/projects/${id}/kanban`,
  
  // Tasks
  TASKS: '/tasks',
  TASK_DETAIL: (id: string) => `/tasks/${id}`,
  
  // Notes
  NOTES: '/notes',
  NOTE_DETAIL: (id: string) => `/notes/${id}`,
  
  // Orders
  ORDERS: '/orders',
  ORDER_CREATE: '/orders/create',
  ORDER_DETAIL: (id: string) => `/orders/${id}`,
  
  // Messenger
  MESSENGER: '/messenger',
  CHAT: (id: string) => `/messenger/${id}`,
  
  // Portfolio
  PORTFOLIO: '/portfolio',
  PORTFOLIO_ITEM: (id: string) => `/portfolio/${id}`,
  
  // Analytics
  ANALYTICS: '/analytics',
  REPORTS: '/analytics/reports',
} as const