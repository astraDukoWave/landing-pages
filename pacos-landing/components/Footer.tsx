import { business, buildWhatsAppHref, copyrightYear, formatWeeklyHoursSummary } from '@/config/business'

export default function Footer() {
  return (
    <footer className="border-t border-pacos-fire/20 bg-pacos-black">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-4xl uppercase leading-none tracking-tight text-pacos-white">
              PACO&apos;S
            </p>
            <p className="mt-2 text-sm text-pacos-white/50">Wings &amp; Beer</p>
          </div>

          <div className="space-y-3 text-sm text-pacos-white/70">
            <p className="flex items-start gap-2">
              <span aria-hidden="true">📍</span>
              <span>
                {business.address.street}, {business.address.city}
              </span>
            </p>
            <p className="flex items-start gap-2">
              <span aria-hidden="true">🕒</span>
              <span>{formatWeeklyHoursSummary()}</span>
            </p>
          </div>

          <div className="space-y-4 text-sm">
            <a
              href={buildWhatsAppHref(business.whatsapp.messages.footer)}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 font-semibold text-pacos-white transition-colors hover:text-pacos-fire"
            >
              <span aria-hidden="true">💬</span>
              <span>Escríbenos</span>
            </a>

            <a
              href={`https://instagram.com/${business.instagram.handle}`}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-2 text-pacos-white/70 transition-colors hover:text-pacos-fire"
            >
              <span aria-hidden="true">📷</span>
              <span>@{business.instagram.handle}</span>
            </a>
          </div>
        </div>

        <p className="mt-12 text-center text-xs text-pacos-white/30">
          © {copyrightYear} {business.name} · {business.address.city}, {business.address.region}
        </p>
      </div>
    </footer>
  )
}
