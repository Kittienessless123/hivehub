// locale.constants.ts
export const SUPPORTED_LOCALES = ['ru', 'en'] as const
export type Locale = typeof SUPPORTED_LOCALES[number]

export const DEFAULT_LOCALE: Locale = 'ru'

export const LOCALE_NAMES: Record<Locale, string> = {
  ru: 'Русский',
  en: 'English',
}

export const DATE_FORMATS: Record<Locale, Intl.DateTimeFormatOptions> = {
  ru: {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  },
  en: {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  },
}

export const CURRENCY_FORMATS: Record<Locale, Intl.NumberFormatOptions> = {
  ru: {
    style: 'currency',
    currency: 'RUB',
  },
  en: {
    style: 'currency',
    currency: 'USD',
  },
}