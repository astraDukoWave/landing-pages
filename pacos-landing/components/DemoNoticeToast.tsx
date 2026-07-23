"use client"

import { useEffect, useState } from 'react'
import { DEMO_NOTICE_EVENT } from './WhatsAppCta'

const DEMO_MESSAGE =
  'Sitio de demostración — el chat se activa al lanzar con el negocio.'

export default function DemoNoticeToast() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const show = () => setVisible(true)
    window.addEventListener(DEMO_NOTICE_EVENT, show)
    return () => window.removeEventListener(DEMO_NOTICE_EVENT, show)
  }, [])

  useEffect(() => {
    if (!visible) return
    const timeout = setTimeout(() => setVisible(false), 4000)
    return () => clearTimeout(timeout)
  }, [visible])

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-x-4 bottom-6 z-[100] mx-auto max-w-md rounded-xl border border-brand-primary/30 bg-surface-elevated px-5 py-4 text-center text-sm text-ink shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-300 sm:inset-x-auto sm:right-6 ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      {DEMO_MESSAGE}
    </div>
  )
}
