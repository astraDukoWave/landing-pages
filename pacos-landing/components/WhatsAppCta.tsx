"use client"

import type { ReactNode, MouseEvent } from 'react'
import { business, buildWhatsAppHref, type WhatsAppContext } from '@/config/business'

export const DEMO_NOTICE_EVENT = 'pacos:whatsapp-demo-notice'

type WhatsAppCtaProps = {
  context: WhatsAppContext
  className?: string
  ariaLabel?: string
  children: ReactNode
}

/**
 * Único punto de render para los CTAs de WhatsApp. En modo 'demo' conserva la UX
 * completa (visible, con su mensaje) pero intercepta el click y dispara el aviso
 * de demostración en vez de navegar — la URL pública nunca abre un chat real.
 */
export default function WhatsAppCta({
  context,
  className,
  ariaLabel,
  children,
}: WhatsAppCtaProps) {
  const message = business.whatsapp.messages[context] ?? business.whatsapp.messages.default
  const href = buildWhatsAppHref(message)
  const isDemo = business.whatsapp.mode === 'demo'

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isDemo) {
      event.preventDefault()
      window.dispatchEvent(new CustomEvent(DEMO_NOTICE_EVENT))
    }
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={ariaLabel}
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  )
}
