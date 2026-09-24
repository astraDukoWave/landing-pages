"use client"

import { useId, useRef } from 'react'
import type { ReactNode } from 'react'
import { business, buildWhatsAppHref, type WhatsAppContext } from '@/config/business'
import { demoCopy } from '@/data/copy'

type Props = { context: WhatsAppContext; className?: string; ariaLabel?: string; children: ReactNode }
export default function WhatsAppCta({ context, className, ariaLabel, children }: Props) {
  const dialog = useRef<HTMLDialogElement>(null)
  const id = useId()
  const message = business.whatsapp.messages[context] ?? business.whatsapp.messages.default
  if (!business.demo && business.whatsapp.mode === 'number' && business.whatsapp.activeNumber) {
    return <a href={buildWhatsAppHref(message)} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} className={className}>{children}</a>
  }
  return <>
    <button type="button" aria-label={ariaLabel} aria-haspopup="dialog" className={className} onClick={() => dialog.current?.showModal()}>{children}</button>
    <dialog ref={dialog} aria-labelledby={`${id}-title`} aria-describedby={`${id}-body`} className="w-[calc(100%-2rem)] max-w-lg rounded-xl border border-ink/20 bg-surface-elevated p-6 text-ink shadow-2xl backdrop:bg-black/75 sm:p-8">
      <h2 id={`${id}-title`} className="font-display text-3xl">{demoCopy.contactTitle}</h2>
      <p id={`${id}-body`} className="mt-4 text-sm leading-relaxed text-ink-muted">{demoCopy.contactBody}</p>
      <p className="eyebrow mt-6">{demoCopy.messageLabel}</p>
      <blockquote className="mt-3 border-l-2 border-brand-primary pl-4 text-sm leading-relaxed">{message}</blockquote>
      <form method="dialog" className="mt-7"><button className="button-primary">{demoCopy.close}</button></form>
    </dialog>
  </>
}
