import { business } from '@/config/business'
import { eventsCopy } from '@/data/copy'

export default function EmptyEventsState() {
  return (
    <div className="mt-12 rounded-lg border border-brand-primary/20 bg-surface/50 px-6 py-16 text-center md:mt-16">
      <p className="font-display text-3xl uppercase tracking-tight text-ink md:text-4xl">
        {eventsCopy.emptyStateHeading}
      </p>
      <p className="mx-auto mt-3 max-w-md text-sm text-ink/70">
        {eventsCopy.emptyStateMessage}
      </p>
      <a
        href={`https://instagram.com/${business.instagram.handle}`}
        target="_blank"
        rel="noreferrer noopener"
        className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.22em] text-brand-primary transition-colors hover:text-brand-primary-strong"
      >
        <span>@{business.instagram.handle}</span>
        <span aria-hidden="true">↗</span>
      </a>
    </div>
  )
}
