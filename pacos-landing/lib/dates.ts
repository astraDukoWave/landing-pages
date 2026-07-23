/**
 * Fechas ISO se anclan a UTC explícitamente (T00:00:00Z + timeZone: 'UTC' en el
 * formateo) para que el día de la semana no dependa de la zona horaria de la
 * máquina que hace el build ni del navegador de quien la ve.
 */
function toUtcDate(dateISO: string): Date {
  return new Date(`${dateISO}T00:00:00Z`)
}

export function formatEventWeekday(dateISO: string): string {
  return toUtcDate(dateISO)
    .toLocaleDateString('es-MX', { weekday: 'long', timeZone: 'UTC' })
    .toUpperCase()
}

export function formatEventDayMonth(dateISO: string): string {
  const date = toUtcDate(dateISO)
  const day = date.toLocaleDateString('es-MX', { day: 'numeric', timeZone: 'UTC' })
  const month = date
    .toLocaleDateString('es-MX', { month: 'short', timeZone: 'UTC' })
    .replace('.', '')
  return `${day} ${month}`.toUpperCase()
}

export function isPastDate(dateISO: string, now: Date = new Date()): boolean {
  const startOfToday = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  )
  return toUtcDate(dateISO).getTime() < startOfToday.getTime()
}
