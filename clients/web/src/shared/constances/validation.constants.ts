// validation.constants.ts
export const VALIDATION = {
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 32,
    PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  },
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
  },
  TEXT: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 1000,
  },
  BUDGET: {
    MIN: 100,
    MAX: 1000000,
  },
} as const