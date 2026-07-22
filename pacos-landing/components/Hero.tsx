"use client"

import { useEffect, useState } from 'react'
import { business, formatWeeklyHoursSummary } from '@/config/business'

function useScrollTrigger() {
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const updateTrigger = () => {
      setTriggered(window.scrollY > 0)
    }

    updateTrigger()
    window.addEventListener('scroll', updateTrigger, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateTrigger)
    }
  }, [])

  return triggered
}

export default function Hero() {
  const hasScrolled = useScrollTrigger()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsVisible(true)
    })

    return () => {
      window.cancelAnimationFrame(frame)
    }
  }, [])

  const revealClass = () =>
    `transform transition-all duration-700 ease-out ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
    }`

  return (
    <section
      id="hero"
      aria-label="Hero de Paco's Wings & Beer"
      className="relative h-screen min-h-[100svh] overflow-hidden bg-pacos-black"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-pacos-black via-pacos-gray to-pacos-black"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent"
      />

      <div className="relative z-10 flex h-full items-center">
        <div className="w-full px-6 sm:px-10 md:pl-14 lg:pl-20 xl:pl-28">
          <div className="max-w-5xl">
            <div
              className={`${revealClass()} mb-5 inline-flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white`}
              style={{ transitionDelay: '150ms' }}
            >
              <span className="inline-flex h-2.5 w-2.5 items-center justify-center rounded-full bg-white/20">
                <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
              </span>
              <span>EN VIVO ESTE SÁBADO</span>
            </div>

            <h1
              className={`${revealClass()} font-display text-6xl uppercase leading-[0.9] tracking-tight text-pacos-white md:text-8xl lg:text-9xl`}
              style={{ transitionDelay: '300ms' }}
            >
              <span className="block max-w-[10ch] sm:max-w-none">
                WINGS. CHELA. CHOLULA.
              </span>
            </h1>

            <p
              className={`${revealClass()} mt-5 max-w-3xl text-sm uppercase tracking-widest text-pacos-white/60 md:text-base`}
              style={{ transitionDelay: '600ms' }}
            >
              {business.address.street.toUpperCase()} · {formatWeeklyHoursSummary().toUpperCase()}
            </p>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className={`absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-pacos-fire/60 transition-all duration-300 ${
          hasScrolled ? 'pointer-events-none translate-y-2 opacity-0' : 'opacity-100'
        }`}
      >
        <span className="inline-flex h-10 w-10 items-center justify-center text-2xl animate-bounce">
          ↓
        </span>
      </div>
    </section>
  )
}
