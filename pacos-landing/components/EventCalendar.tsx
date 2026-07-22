import { business } from '@/config/business'

type EventItem = {
  dia: string
  fecha: string
  tipo: string
  desc: string
  hora: string
  status: 'CONFIRMADO' | 'POR ANUNCIAR'
}

const events: EventItem[] = [
  {
    dia: 'SÁBADO',
    fecha: '10 MAY',
    tipo: '🥊 BOX EN VIVO',
    desc: 'Pelea de campeonato — pantalla grande',
    hora: '8:00 PM',
    status: 'CONFIRMADO',
  },
  {
    dia: 'DOMINGO',
    fecha: '11 MAY',
    tipo: '⚽ PARTIDO',
    desc: 'Liga MX — Semifinal',
    hora: '7:00 PM',
    status: 'CONFIRMADO',
  },
  {
    dia: 'MARTES',
    fecha: '13 MAY',
    tipo: '🍺 NOCHE 2x1',
    desc: 'Chelas 2x1 toda la noche',
    hora: '6:00 PM',
    status: 'CONFIRMADO',
  },
  {
    dia: 'SÁBADO',
    fecha: '17 MAY',
    tipo: '🥊 BOX EN VIVO',
    desc: 'Cartelera por confirmar',
    hora: '8:00 PM',
    status: 'POR ANUNCIAR',
  },
]

function StatusBadge({ status }: { status: EventItem['status'] }) {
  const isConfirmed = status === 'CONFIRMADO'

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.18em] ${
        isConfirmed
          ? 'bg-emerald-500/15 text-emerald-400'
          : 'bg-white/10 text-pacos-white/60'
      }`}
    >
      {status}
    </span>
  )
}

export default function EventCalendar() {
  return (
    <section className="bg-pacos-gray py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="font-display text-4xl uppercase tracking-tight text-pacos-white md:text-6xl">
            ESTA SEMANA EN PACO&apos;S
          </h2>
          <div className="mt-4 h-1 w-16 bg-pacos-fire" />
          <p className="mt-4 font-body text-sm italic text-pacos-white/50">
            Llega antes de las 8PM para asegurar tu lugar
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2">
          {events.map((event) => (
            <article
              key={`${event.dia}-${event.fecha}-${event.tipo}`}
              className="group rounded-lg border border-pacos-fire/20 bg-pacos-black/50 p-6 transition-all duration-300 hover:scale-[1.03] hover:border-pacos-fire/60"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-display text-4xl uppercase leading-none tracking-tight text-pacos-fire md:text-5xl">
                    {event.dia}
                  </p>
                  <p className="mt-1 text-sm uppercase tracking-[0.28em] text-pacos-white/50">
                    {event.fecha}
                  </p>
                </div>

                <StatusBadge status={event.status} />
              </div>

              <div className="mt-6 space-y-4">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-pacos-white">
                  {event.tipo}
                </p>

                <p className="max-w-md text-sm leading-6 text-pacos-white/70">
                  {event.desc}
                </p>

                <p className="text-sm uppercase tracking-[0.18em] text-pacos-white/60">
                  Desde las {event.hora}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 border-t border-pacos-white/10 pt-8 md:mt-16">
          <a
            href={`https://instagram.com/${business.instagram.handle}`}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.22em] text-pacos-white/70 transition-colors hover:text-pacos-fire"
          >
            <span>¿Quieres saber qué viene? Síguenos en Instagram</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}
