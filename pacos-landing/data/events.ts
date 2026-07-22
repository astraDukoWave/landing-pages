export type EventStatus = 'CONFIRMADO' | 'POR ANUNCIAR'

export type EventItem = {
  dateISO: string
  tipo: string
  desc: string
  hora: string
  status: EventStatus
}

export const events: EventItem[] = [
  {
    dateISO: '2025-05-10',
    tipo: '🥊 BOX EN VIVO',
    desc: 'Pelea de campeonato — pantalla grande',
    hora: '8:00 PM',
    status: 'CONFIRMADO',
  },
  {
    dateISO: '2025-05-11',
    tipo: '⚽ PARTIDO',
    desc: 'Liga MX — Semifinal',
    hora: '7:00 PM',
    status: 'CONFIRMADO',
  },
  {
    dateISO: '2025-05-13',
    tipo: '🍺 NOCHE 2x1',
    desc: 'Chelas 2x1 toda la noche',
    hora: '6:00 PM',
    status: 'CONFIRMADO',
  },
  {
    dateISO: '2025-05-17',
    tipo: '🥊 BOX EN VIVO',
    desc: 'Cartelera por confirmar',
    hora: '8:00 PM',
    status: 'POR ANUNCIAR',
  },
]
