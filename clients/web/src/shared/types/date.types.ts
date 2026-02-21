export type DateValue = Date | null;
export type DateRange = { start: Date | null; end: Date | null };
export type WeekStart = 0 | 1; // 0 - воскресенье, 1 - понедельник
export type DateFormat = string; // 'DD.MM.YYYY' | 'YYYY-MM-DD' и т.д.