"use client"

import { useState } from 'react'
import { business } from '@/config/business'
import { menuCategories, menuItems } from '@/data/menu'
import { demoCopy, menuCopy } from '@/data/copy'
import WhatsAppCta from './WhatsAppCta'

export default function MenuHero() {
  const [category, setCategory] = useState('all')
  const visible = menuItems.filter(item => category === 'all' || item.category === category)
  return (
    <section id="menu" className="border-y border-ink/15 bg-surface-elevated py-16 md:py-24">
      <div className="shell">
        <p className="eyebrow">{menuCopy.eyebrow}</p>
        <h2 className="section-title mt-4">{menuCopy.heading}</h2>
        <p className="mt-4 text-ink-muted">{menuCopy.caption}</p>
        {business.demo && <p className="mt-5 max-w-2xl border-l-2 border-brand-primary pl-4 text-sm leading-relaxed text-ink-muted">{demoCopy.menuNote}</p>}
        <div aria-label={menuCopy.filterLabel} role="group" className="mt-8 flex flex-wrap gap-2">
          {[{ id: 'all', label: menuCopy.all }, ...menuCategories].map(item => (
            <button key={item.id} type="button" aria-pressed={category === item.id} onClick={() => setCategory(item.id)} className={`min-h-11 rounded-full border px-4 py-2 text-sm transition-colors ${category === item.id ? 'border-brand-primary bg-brand-primary text-surface' : 'border-ink/25 text-ink hover:border-brand-primary'}`}>{item.label}</button>
          ))}
        </div>
        <p role="status" aria-live="polite" className="mt-6 text-xs uppercase tracking-widest text-ink-muted">{visible.length} {menuCopy.count}</p>
        <div className="mt-2 grid gap-x-10 md:grid-cols-2">
          {visible.map(item => (
            <article key={item.id} className="border-b border-ink/20 py-7">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-3xl tracking-wide">{item.name}</h3>
                <span className="text-xs text-brand-primary">{item.price !== undefined ? new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(item.price) : demoCopy.pricePending}</span>
              </div>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted">{item.description}</p>
            </article>
          ))}
        </div>
        <div className="mt-9"><WhatsAppCta context="menu" className="button-secondary">{menuCopy.contact} <span aria-hidden="true">↗</span></WhatsAppCta></div>
      </div>
    </section>
  )
}
