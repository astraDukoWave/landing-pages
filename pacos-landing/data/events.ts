export type EventStatus = 'CONFIRMADO' | 'POR ANUNCIAR'

export type EventItem = {
  dateISO: string
  tipo: string
  desc: string
  hora: string
  status: EventStatus
}

// HP-4: sin eventos vigentes confirmados al momento del demo. EventCalendar cae
// al estado vacío diseñado (lib/events.ts + EmptyEventsState) — demo válido por
// spec. Jonathan agrega eventos aquí según el flujo gestionado (ver CLAUDE.md).
export const events: EventItem[] = []
