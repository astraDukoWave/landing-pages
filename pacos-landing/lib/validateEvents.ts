import type { EventItem, EventStatus } from '@/data/events'

const DATE_ISO_PATTERN = /^\d{4}-\d{2}-\d{2}$/
const VALID_STATUSES: EventStatus[] = ['CONFIRMADO', 'POR ANUNCIAR']

function isValidCalendarDate(dateISO: string): boolean {
  if (!DATE_ISO_PATTERN.test(dateISO)) return false
  const [year, month, day] = dateISO.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  )
}

/**
 * Falla el build con archivo+campo si un evento está malformado — protege el
 * flujo gestionado (REQ-09/C4) de errores de dedo al editar data/events.ts.
 */
export function validateEvents(events: EventItem[]): void {
  events.forEach((event, index) => {
    const label = `data/events.ts: events[${index}]`

    if (!event.dateISO || !isValidCalendarDate(event.dateISO)) {
      throw new Error(
        `${label}.dateISO ("${event.dateISO}") no es una fecha ISO válida (YYYY-MM-DD).`
      )
    }
    if (!event.tipo || event.tipo.trim() === '') {
      throw new Error(`${label}.tipo está vacío o falta.`)
    }
    if (!event.desc || event.desc.trim() === '') {
      throw new Error(`${label}.desc está vacío o falta.`)
    }
    if (!event.hora || event.hora.trim() === '') {
      throw new Error(`${label}.hora está vacío o falta.`)
    }
    if (!VALID_STATUSES.includes(event.status)) {
      throw new Error(
        `${label}.status ("${event.status}") debe ser CONFIRMADO o POR ANUNCIAR.`
      )
    }
  })
}
