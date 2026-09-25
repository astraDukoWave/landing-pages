import { business } from '@/config/business'
import { heroCopy } from '@/data/copy'

export default function Hero() {
  return (
    <section id="inicio" className="shell grid gap-12 py-12 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-10 md:py-20">
      <div>
        <p className="eyebrow">{heroCopy.eyebrow}</p>
        <h1 className="mt-7 font-display text-[clamp(4.8rem,10vw,9rem)] leading-[0.87] tracking-tight">
          {heroCopy.headline.map((line, i) => <span key={line} className={`block ${i === 1 ? 'text-brand-accent' : ''}`}>{line}</span>)}
        </h1>
        <p className="mt-7 max-w-md text-base leading-relaxed text-ink-muted">{heroCopy.description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a className="button-primary" href="#menu">{heroCopy.menu} <span aria-hidden="true">↗</span></a>
          <a className="button-secondary" href="#visitanos">{heroCopy.visit}</a>
        </div>
        <p className="mt-8 text-xs uppercase tracking-[0.18em] text-ink-muted">{business.address.city} / {business.address.region}</p>
      </div>
      <div className="relative border border-brand-primary/50 bg-brand-primary p-7 text-brand-onPrimary sm:p-10 md:rotate-2">
        <div className="flex justify-between border-b border-brand-onPrimary/40 pb-5 text-xs font-bold uppercase tracking-[0.15em]">
          <span>{business.shortName}</span><span>{heroCopy.posterTop}</span>
        </div>
        <p className="whitespace-pre-line py-9 font-display text-[clamp(3.5rem,6.7vw,6.5rem)] leading-[0.9] tracking-tight">{heroCopy.posterMain}</p>
        <div className="flex items-center justify-between border-t border-brand-onPrimary/40 pt-5">
          <span className="text-xs font-bold uppercase tracking-widest">{heroCopy.posterBottom}</span>
          <span aria-hidden="true" className="text-4xl">✳</span>
        </div>
      </div>
    </section>
  )
}
