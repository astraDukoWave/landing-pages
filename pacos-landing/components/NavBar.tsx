"use client"

import { useEffect, useState } from 'react'
import { business, buildWhatsAppHref } from '@/config/business'

function useScrollTrigger(threshold = 8) {
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const updateTrigger = () => {
      setTriggered(window.scrollY > threshold)
    }

    updateTrigger()
    window.addEventListener('scroll', updateTrigger, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateTrigger)
    }
  }, [threshold])

  return triggered
}

export default function NavBar() {
  const hasShadow = useScrollTrigger()

  return (
    <nav
      className={`fixed top-0 z-50 h-14 w-full bg-surface/95 backdrop-blur-sm transition-shadow duration-300 md:h-16 ${
        hasShadow ? 'shadow-[0_10px_30px_rgba(0,0,0,0.35)]' : 'shadow-none'
      }`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col leading-none">
          <span className="font-display text-[1.9rem] uppercase tracking-[0.08em] text-brand-primary sm:text-[2.15rem]">
            PACO&apos;S
          </span>
          <span className="-mt-1 text-[0.55rem] font-medium uppercase tracking-[0.32em] text-ink-muted sm:text-[0.62rem]">
            WINGS &amp; BEER
          </span>
        </div>

        <a
          href={buildWhatsAppHref(business.whatsapp.messages.nav)}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Pide ahora por WhatsApp"
          className="inline-flex items-center justify-center rounded-full bg-brand-primary px-4 py-2 text-sm font-bold text-black transition-all duration-300 hover:bg-brand-primary-strong hover:shadow-[0_0_20px_theme(colors.brand.primary/40%)] sm:px-5 sm:text-base"
        >
          <span className="sm:hidden">PIDE</span>
          <span className="hidden sm:inline">PIDE AHORA</span>
        </a>
      </div>
    </nav>
  )
}
