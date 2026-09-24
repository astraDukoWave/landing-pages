import { business } from '@/config/business'
import { eventsCopy } from '@/data/copy'
export default function EmptyEventsState() {
  return <div className="mt-8 border-l-2 border-brand-primary pl-6">
    <h3 className="font-display text-3xl">{eventsCopy.emptyStateHeading}</h3>
    <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">{eventsCopy.emptyStateMessage}</p>
    {business.instagram.confirmed ? <a className="mt-4 inline-flex min-h-11 items-center text-sm text-brand-accent" href={`https://instagram.com/${business.instagram.handle}`} target="_blank" rel="noopener noreferrer">{eventsCopy.instagramCta} ↗</a> : <a className="mt-4 inline-flex min-h-11 items-center text-sm text-brand-accent" href="#menu">{eventsCopy.menu} ↗</a>}
  </div>
}
