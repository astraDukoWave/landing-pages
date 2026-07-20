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
              <span>Av. Ferrocarril 707, Cholula</span>
            </p>
            <p className="flex items-start gap-2">
              <span aria-hidden="true">🕒</span>
              <span>Lun–Mar y Jue–Dom · 1PM–10PM</span>
            </p>
            <p className="text-sm italic text-pacos-fire/60">Cerrado miércoles</p>
          </div>

          <div className="space-y-4 text-sm">
            <a
              href="https://wa.me/52XXXXXXXXXX"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 font-semibold text-pacos-white transition-colors hover:text-pacos-fire"
            >
              <span aria-hidden="true">💬</span>
              <span>Escríbenos</span>
            </a>

            <a
              href="https://instagram.com/pacosbar"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-2 text-pacos-white/70 transition-colors hover:text-pacos-fire"
            >
              <span aria-hidden="true">📷</span>
              <span>@pacosbar</span>
            </a>
          </div>
        </div>

        <p className="mt-12 text-center text-xs text-pacos-white/30">
          © 2025 Paco&apos;s Wings &amp; Beer · Cholula, Puebla
        </p>
      </div>
    </footer>
  )
}
