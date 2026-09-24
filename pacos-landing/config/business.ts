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
  // Solo `default` es obligatorio: un contexto sin mensaje propio cae en él (REQ-08).
  messages: Partial<Record<WhatsAppContext, string>> & { default: string }
}

export type BusinessConfig = {
  name: string
  shortName: string
  logoSrc?: string
  mapsUrl?: string
  subtitle: string
  demo: boolean
  showEvents: boolean
  timeZone: string
  tagline: string
  address: {
    street: string
    neighborhood?: string
    postalCode?: string
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
  subtitle: 'Wings & Beer',
  logoSrc: '/brand/logo-pacos.jpg',
  mapsUrl: 'https://maps.app.goo.gl/W6WF4REVtPAsD1xaA',
  demo: true,
  showEvents: true,
  timeZone: 'America/Mexico_City',
  tagline: 'Wings. Chela. Cholula.',
  address: {
    street: 'Ferrocarril 707',
    neighborhood: 'Centro',
    postalCode: '72750',
    city: 'San Andrés Cholula',
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
      nav: 'Hola, me gustaría consultar el menú y la disponibilidad.',
      menu: 'Hola, tengo una consulta sobre el menú.',
      footer: 'Hola, quiero más información de Paco’s Wings & Beer',
      default: 'Hola, quiero más información de Paco’s Wings & Beer',
    },
  },
  instagram: {
    handle: 'pacoscholula',
    // Perfil proporcionado por el usuario en la revisión del 2026-09-24.
    confirmed: true,
  },
  baseUrl: 'https://landing-pages-blond-eight.vercel.app',
  seo: {
    title: "Paco's Wings & Beer — Cholula",
    description:
      'Propuesta de sitio: explora un menú de muestra, ubicación y contacto. Contenido pendiente de confirmar con el negocio.',
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

export function formatWeeklyHoursSummary(hours: WeeklyHours = business.hours): string {
  const groups: { labels: string[]; hours: DayHours }[] = []
  for (const { key, label } of DAY_LABELS) {
    const value = hours[key]
    const previous = groups[groups.length - 1]
    if (previous && JSON.stringify(previous.hours) === JSON.stringify(value)) {
      previous.labels.push(label)
    } else groups.push({ labels: [label], hours: value })
  }
  return groups.map(({ labels, hours }) => {
    const days = labels.length > 1 ? `${labels[0]}–${labels[labels.length - 1]}` : labels[0]
    return `${days} ${hours ? `${hours.open}–${hours.close}` : 'cerrado'}`
  }).join(' · ')
}

export const mapsHref = business.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  [business.address.street, business.address.city, business.address.region, business.address.country].join(', ')
)}`
export const siteTitle = `${business.demo ? 'Propuesta · ' : ''}${business.seo.title}`

export function buildWhatsAppHref(message?: string): string {
  if (business.whatsapp.mode !== 'number' || !business.whatsapp.activeNumber) {
    return '#'
  }
  const text = message ?? business.whatsapp.messages.default
  return `https://wa.me/${business.whatsapp.activeNumber}?text=${encodeURIComponent(text)}`
}
