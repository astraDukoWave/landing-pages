import { business } from '@/config/business'
import { navCopy } from '@/data/copy'
import WhatsAppCta from './WhatsAppCta'

export default function NavBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/15 bg-surface/95 backdrop-blur-md">
      <nav aria-label={navCopy.label} className="shell flex min-h-20 items-center justify-between gap-3 py-3">
        <a href="#inicio" aria-label={navCopy.home} className="shrink-0">
          <span className="block font-display text-3xl leading-none tracking-wide text-brand-primary sm:text-4xl">{business.shortName}</span>
          <span className="text-[0.6rem] uppercase tracking-[0.2em] text-ink-muted">{business.subtitle}</span>
        </a>
        <div className="flex items-center gap-3 text-xs font-semibold sm:gap-7 sm:text-sm">
          <a className="py-3 hover:text-brand-primary" href="#menu">{navCopy.menu}</a>
          <a className="hidden py-3 hover:text-brand-primary sm:block" href="#visitanos">{navCopy.visit}</a>
          <WhatsAppCta context="nav" className="button-primary">{navCopy.contact}</WhatsAppCta>
        </div>
      </nav>
    </header>
  )
}
