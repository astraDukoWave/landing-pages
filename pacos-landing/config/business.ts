export type DayHours = { open: string; close: string } | null

export type WeeklyHours = {
  monday: DayHours
  tuesday: DayHours
  wednesday: DayHours
  thursday: DayHours
  friday: DayHours
  saturday: DayHours
  sunday: DayHours
}

export type WhatsAppMode = 'demo' | 'number'

export type WhatsAppContext = 'nav' | 'menu' | 'footer'

export type WhatsAppConfig = {
  mode: WhatsAppMode
  activeNumber: string | null
  messages: Record<WhatsAppContext, string> & { default: string }
}

export type BusinessConfig = {
  name: string
  shortName: string
  tagline: string
  address: {
    street: string
    city: string
    region: string
    country: string
  }
  hours: WeeklyHours
  whatsapp: WhatsAppConfig
  instagram: {
    handle: string
    confirmed: boolean
  }
  baseUrl: string
  seo: {
    title: string
    description: string
    keywords: string[]
  }
}

export const business: BusinessConfig = {
  name: "Paco's Wings & Beer",
  shortName: "Paco's",
  tagline: 'Wings. Chela. Cholula.',
  address: {
    street: 'Av. Ferrocarril 707',
    city: 'Cholula',
    region: 'Puebla',
    country: 'México',
  },
  hours: {
    monday: { open: '13:00', close: '22:00' },
    tuesday: { open: '13:00', close: '22:00' },
    wednesday: null,
    thursday: { open: '13:00', close: '22:00' },
    friday: { open: '13:00', close: '22:00' },
    saturday: { open: '13:00', close: '22:00' },
    sunday: { open: '13:00', close: '22:00' },
  },
  whatsapp: {
    // Modo demo por default (Q2): sin número personal en la URL pública.
    // El número de demostración lo inyecta Jonathan en runtime, solo en vivo,
    // y nunca se commitea. Ver checklist de reversión en CLAUDE.md.
    mode: 'demo',
    activeNumber: null,
    messages: {
      nav: 'Hola, quiero pedir ahora 🍗',
      menu: 'Hola, quiero ver el menú completo de Paco’s',
      footer: 'Hola, quiero más información de Paco’s Wings & Beer',
      default: 'Hola, quiero más información de Paco’s Wings & Beer',
    },
  },
  instagram: {
    handle: 'pacoswingsandbeer',
    // Q3: handle único del demo, marcado pendiente de confirmación del cliente
    // (cierra en Gate Producción).
    confirmed: false,
  },
  baseUrl: 'https://landing-pages-blond-eight.vercel.app',
  seo: {
    title: "Paco's Wings & Beer — Cholula",
    description:
      'Wings, chelas frías y transmisiones en vivo de peleas y partidos. Encuentra el mejor bar deportivo en Cholula.',
    keywords: [
      'bar',
      'Cholula',
      'wings',
      'chelas',
      'peleas de box',
      'eventos deportivos',
      'restaurante',
    ],
  },
}

export const copyrightYear = new Date().getFullYear()

const DAY_LABELS: { key: keyof WeeklyHours; label: string }[] = [
  { key: 'monday', label: 'Lun' },
  { key: 'tuesday', label: 'Mar' },
  { key: 'wednesday', label: 'Mié' },
  { key: 'thursday', label: 'Jue' },
  { key: 'friday', label: 'Vie' },
  { key: 'saturday', label: 'Sáb' },
  { key: 'sunday', label: 'Dom' },
]

function formatHourLabel(hours: DayHours): string {
  if (!hours) return 'Cerrado'
  const [openH] = hours.open.split(':').map(Number)
  const [closeH] = hours.close.split(':').map(Number)
  const fmt = (h: number) => {
    const period = h >= 12 ? 'PM' : 'AM'
    const twelveHour = h % 12 === 0 ? 12 : h % 12
    return `${twelveHour}${period}`
  }
  return `${fmt(openH)}–${fmt(closeH)}`
}

/**
 * Colapsa días consecutivos con el mismo horario en rangos ("Lun–Mar y Jue–Dom · 1PM–10PM").
 * Única fuente del texto de horarios: Hero y Footer llaman a esta función, nunca escriben el string a mano.
 */
export function formatWeeklyHoursSummary(hours: WeeklyHours = business.hours): string {
  const groups: { label: string; hours: DayHours }[] = []

  for (const { key, label } of DAY_LABELS) {
    const dayHours = hours[key]
    const last = groups[groups.length - 1]
    const sameAsLast =
      last &&
      ((last.hours === null && dayHours === null) ||
        (last.hours &&
          dayHours &&
          last.hours.open === dayHours.open &&
          last.hours.close === dayHours.close))

    if (sameAsLast) {
      last.label = `${last.label.split('–')[0]}–${label}`
    } else {
      groups.push({ label, hours: dayHours })
    }
  }

  const openGroups = groups.filter((g) => g.hours !== null)
  const closedGroups = groups.filter((g) => g.hours === null)

  const openPart = openGroups
    .map((g) => g.label)
    .join(' y ')
  const hoursLabel = openGroups[0] ? formatHourLabel(openGroups[0].hours) : ''
  const closedPart = closedGroups.map((g) => `Cerrado ${g.label}`).join(', ')

  return [openPart && `${openPart} · ${hoursLabel}`, closedPart]
    .filter(Boolean)
    .join(' · ')
}

export function buildWhatsAppHref(message?: string): string {
  if (business.whatsapp.mode !== 'number' || !business.whatsapp.activeNumber) {
    return '#'
  }
  const text = message ?? business.whatsapp.messages.default
  return `https://wa.me/${business.whatsapp.activeNumber}?text=${encodeURIComponent(text)}`
}
