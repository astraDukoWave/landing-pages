import { business, copyrightYear } from '@/config/business'
import { demoCopy, footerCopy } from '@/data/copy'

export default function Footer() {
  return (
    <footer className="border-t border-ink/20 py-9">
      <div className="shell flex flex-wrap items-center justify-between gap-6">
        <div><p className="font-display text-3xl text-brand-primary">{business.shortName}</p><p className="mt-2 text-xs text-ink-muted">© {copyrightYear} · {business.demo ? footerCopy.demo : business.name}</p></div>
        <div className="text-sm text-ink-muted">{business.instagram.confirmed ? <a href={`https://instagram.com/${business.instagram.handle}`} target="_blank" rel="noopener noreferrer">{footerCopy.social} ↗</a> : <p>{demoCopy.socialPending}</p>}</div>
        <a href="#inicio" className="py-3 text-sm underline underline-offset-4">{footerCopy.back} ↑</a>
      </div>
    </footer>
  )
}
