import Image from 'next/image'
import { menuItems } from '@/data/menu'
import { menuCopy } from '@/data/copy'
import WhatsAppCta from './WhatsAppCta'

export default function MenuHero() {
  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="font-display text-5xl uppercase tracking-tight text-ink md:text-7xl">
            {menuCopy.heading}
          </h2>
          <p className="mt-4 font-body italic text-ink/40">
            {menuCopy.caption}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item, index) => (
            <article key={item.name} className="group">
              <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-brand-primary/40 via-brand-accent/30 to-surface shadow-[0_0_0_1px_theme(colors.brand.primary/16%)]">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <>
                      <div
                        aria-hidden="true"
                        className={`absolute inset-0 bg-gradient-to-br from-brand-primary/35 via-surface/15 to-brand-accent/25 transition-transform duration-500 group-hover:scale-105 ${
                          index % 2 === 0 ? 'from-brand-primary/40' : 'from-brand-accent/35'
                        }`}
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_45%),linear-gradient(to_bottom,rgba(0,0,0,0.08),rgba(0,0,0,0.45))] transition-transform duration-500 group-hover:scale-105"
                      />
                    </>
                  )}
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {item.badge ? (
                  <span className="inline-flex rounded-full bg-brand-primary px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-black">
                    {item.badge}
                  </span>
                ) : null}

                <h3 className="font-display text-2xl uppercase tracking-tight text-ink md:text-3xl">
                  {item.name}
                </h3>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center md:mt-16">
          <WhatsAppCta
            context="menu"
            className="inline-flex items-center justify-center rounded-full bg-brand-primary px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-black transition-colors hover:bg-brand-primary-strong"
          >
            {menuCopy.ctaLabel}
          </WhatsAppCta>
        </div>
      </div>
    </section>
  )
}
