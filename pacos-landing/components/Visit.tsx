import { business, formatWeeklyHoursSummary, mapsHref } from '@/config/business'
import { demoCopy, visitCopy } from '@/data/copy'
import WhatsAppCta from './WhatsAppCta'

export default function Visit() {
  return (
    <section id="visitanos" className="border-t border-ink/15 py-16 md:py-24">
      <div className="shell grid gap-12 md:grid-cols-2">
        <div>
          <p className="eyebrow">{visitCopy.eyebrow}</p>
          <h2 className="section-title mt-4 whitespace-pre-line">{visitCopy.heading}</h2>
          {business.demo && <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-muted">{demoCopy.provisional}</p>}
        </div>
        <div className="space-y-7">
          <div><h3 className="eyebrow">{visitCopy.address}</h3><address className="mt-3 text-xl not-italic">{business.address.street}<br />{business.address.city}, {business.address.region}</address><a href={mapsHref} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm text-brand-primary underline underline-offset-4">{visitCopy.maps} <span aria-hidden="true">↗</span></a></div>
          <div className="border-t border-ink/20 pt-6"><h3 className="eyebrow">{visitCopy.hours}</h3><p className="mt-3 text-sm leading-7 text-ink-muted">{formatWeeklyHoursSummary()}</p></div>
          <div className="border-t border-ink/20 pt-6"><h3 className="font-display text-3xl">{visitCopy.contact}</h3><p className="mt-3 text-sm leading-relaxed text-ink-muted">{visitCopy.description}</p><WhatsAppCta context="footer" className="button-primary mt-5">{visitCopy.whatsapp}</WhatsAppCta></div>
        </div>
      </div>
    </section>
  )
}
