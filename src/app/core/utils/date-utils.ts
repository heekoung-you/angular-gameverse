export interface DateFormatOptions {
  locale?: string;
  style?: 'short' | 'medium' | 'long' | 'full';
}

const DEFAULT_LOCALE = 'de-DE';
const DEFAULT_STYLE = 'short';

export function formatDate(dateInput: string | Date, options?: DateFormatOptions): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  const locale = options?.locale ?? DEFAULT_LOCALE;
  const style = options?.style ?? DEFAULT_STYLE;
  return new Intl.DateTimeFormat(locale, { dateStyle: style }).format(date);
}
