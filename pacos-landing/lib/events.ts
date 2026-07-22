import { events as allEvents, type EventItem } from '@/data/events'
import { isPastDate } from './dates'

/**
 * Filtra eventos con fecha pasada en build. Nunca llega un evento vencido a la URL pública.
 */
export function getUpcomingEvents(
  events: EventItem[] = allEvents,
  now: Date = new Date()
): EventItem[] {
  return events.filter((event) => !isPastDate(event.dateISO, now))
}
