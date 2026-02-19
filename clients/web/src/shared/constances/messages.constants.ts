// messages.constants.ts
export const SUCCESS_MESSAGES = {
  // Auth
  LOGIN_SUCCESS: 'Вы успешно вошли в систему',
  REGISTER_SUCCESS: 'Регистрация прошла успешно',
  LOGOUT_SUCCESS: 'Вы вышли из системы',
  PASSWORD_RESET_SENT: 'Инструкции по сбросу пароля отправлены на почту',
  PASSWORD_CHANGED: 'Пароль успешно изменен',
  
  // Profile
  PROFILE_UPDATED: 'Профиль обновлен',
  AVATAR_UPLOADED: 'Аватар загружен',
  
  // Projects
  PROJECT_CREATED: 'Проект создан',
  PROJECT_UPDATED: 'Проект обновлен',
  PROJECT_DELETED: 'Проект удален',
  
  // Tasks
  TASK_CREATED: 'Задача создана',
  TASK_UPDATED: 'Задача обновлена',
  TASK_DELETED: 'Задача удалена',
  TASK_COMPLETED: 'Задача выполнена',
  
  // Orders
  ORDER_CREATED: 'Заказ создан',
  ORDER_UPDATED: 'Заказ обновлен',
  ORDER_RESPONDED: 'Отклик отправлен',
  ORDER_COMPLETED: 'Заказ выполнен',
  
  // Messenger
  MESSAGE_SENT: 'Сообщение отправлено',
} as const

export const ERROR_MESSAGES = {
  // Auth
  LOGIN_FAILED: 'Неверный email или пароль',
  REGISTER_FAILED: 'Ошибка при регистрации',
  SESSION_EXPIRED: 'Сессия истекла, войдите снова',
  UNAUTHORIZED: 'Необходима авторизация',
  FORBIDDEN: 'Нет доступа',
  
  // Validation
  REQUIRED_FIELD: 'Поле обязательно для заполнения',
  INVALID_EMAIL: 'Некорректный email',
  INVALID_PASSWORD: 'Пароль должен содержать минимум 8 символов, заглавные и строчные буквы и цифры',
  PASSWORDS_MATCH: 'Пароли не совпадают',
  INVALID_URL: 'Некорректная ссылка',
  
  // Network
  NETWORK_ERROR: 'Ошибка сети',
  SERVER_ERROR: 'Ошибка сервера',
  TIMEOUT: 'Превышено время ожидания',
  
  // Data
  NOT_FOUND: 'Данные не найдены',
  ALREADY_EXISTS: 'Такие данные уже существуют',
  
  // Projects
  PROJECT_CREATE_FAILED: 'Не удалось создать проект',
  PROJECT_UPDATE_FAILED: 'Не удалось обновить проект',
  PROJECT_DELETE_FAILED: 'Не удалось удалить проект',
  
  // Orders
  ORDER_CREATE_FAILED: 'Не удалось создать заказ',
  ORDER_RESPOND_FAILED: 'Не удалось откликнуться на заказ',
  
  // Files
  FILE_TOO_LARGE: 'Файл слишком большой',
  INVALID_FILE_TYPE: 'Недопустимый тип файла',
  UPLOAD_FAILED: 'Не удалось загрузить файл',
} as const

export const WARNING_MESSAGES = {
  UNTITLED_PROJECT: 'Проект без названия будет сохранен как "Без названия"',
  UNSAVED_CHANGES: 'У вас есть несохраненные изменения',
  DELETE_CONFIRM: 'Вы уверены, что хотите удалить? Это действие нельзя отменить',
  LEAVE_PAGE: 'Изменения не сохранятся, если вы покинете страницу',
} as const