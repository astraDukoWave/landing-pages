import { events as allEvents, type EventItem } from '@/data/events'
import { isPastDate } from './dates'

/**
 * Filtra por fecha local en cada render de la ruta dinámica.
 */
export function getUpcomingEvents(
  events: EventItem[] = allEvents,
  now: Date = new Date()
): EventItem[] {
  return events.filter((event) => !isPastDate(event.dateISO, now))
}
