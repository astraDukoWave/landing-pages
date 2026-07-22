import { business, type DayHours, type WeeklyHours } from '@/config/business'

const SCHEMA_DAY_NAME: Record<keyof WeeklyHours, string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
}

function buildOpeningHoursSpecification() {
  return (Object.keys(business.hours) as (keyof WeeklyHours)[])
    .map((day) => ({ day, hours: business.hours[day] }))
    .filter(
      (entry): entry is { day: keyof WeeklyHours; hours: NonNullable<DayHours> } =>
        entry.hours !== null
    )
    .map(({ day, hours }) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${SCHEMA_DAY_NAME[day]}`,
      opens: hours.open,
      closes: hours.close,
    }))
}

/**
 * JSON-LD de negocio local, generado desde config/business.ts (REQ-07).
 * En modo demo se omite `telephone`: no se publica un número personal ni uno falso.
 */
export function buildLocalBusinessSchema() {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BarOrPub',
    name: business.name,
    description: business.seo.description,
    url: business.baseUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      addressCountry: 'MX',
    },
    openingHoursSpecification: buildOpeningHoursSpecification(),
    sameAs: [`https://instagram.com/${business.instagram.handle}`],
  }

  if (business.whatsapp.mode === 'number' && business.whatsapp.activeNumber) {
    schema.telephone = `+${business.whatsapp.activeNumber}`
  }

  return schema
}
