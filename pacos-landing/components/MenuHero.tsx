type MenuItem = {
  name: string
  badge?: string
}

const menuItems: MenuItem[] = [
  { name: 'CLASSIC WINGS', badge: 'EL MÁS PEDIDO' },
  { name: 'WINGS BBQ AHUMADAS' },
  { name: 'BONELESS PICOSOS', badge: '🔥 FAVORITO' },
  { name: 'CUBETA DE CHELAS', badge: 'MEJOR OFERTA' },
  { name: 'PAPAS LOADED' },
  { name: 'ALITAS MIX 50 PZS', badge: 'PARA EL GRUPO' },
]

export default function MenuHero() {
  return (
    <section className="bg-pacos-black py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="font-display text-5xl uppercase tracking-tight text-pacos-white md:text-7xl">
            LO QUE PEDIRÁS
          </h2>
          <p className="mt-4 font-body italic text-pacos-white/40">
            Cholula nunca olió tan bien
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item, index) => (
            <article key={item.name} className="group">
              <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-pacos-fire/40 via-pacos-amber/30 to-pacos-black shadow-[0_0_0_1px_rgba(255,69,0,0.16)]">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <div
                    aria-hidden="true"
                    className={`absolute inset-0 bg-gradient-to-br from-pacos-fire/35 via-pacos-black/15 to-pacos-amber/25 transition-transform duration-500 group-hover:scale-105 ${
                      index % 2 === 0 ? 'from-pacos-fire/40' : 'from-pacos-amber/35'
                    }`}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_45%),linear-gradient(to_bottom,rgba(0,0,0,0.08),rgba(0,0,0,0.45))] transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {item.badge ? (
                  <span className="inline-flex rounded-full bg-pacos-fire px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-black">
                    {item.badge}
                  </span>
                ) : null}

                <h3 className="font-display text-2xl uppercase tracking-tight text-pacos-white md:text-3xl">
                  {item.name}
                </h3>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center md:mt-16">
          <a
            href="https://wa.me/52XXXXXXXXXX?text=Hola%2C%20quiero%20ver%20el%20men%C3%BA%20completo%20de%20Paco%27s"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center justify-center rounded-full bg-pacos-fire px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-black transition-colors hover:bg-pacos-fire-dark"
          >
            VER MENÚ COMPLETO
          </a>
        </div>
      </div>
    </section>
  )
}
