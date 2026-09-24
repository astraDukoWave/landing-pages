import { business } from '@/config/business'
import { demoCopy } from '@/data/copy'
import NavBar from '@/components/NavBar'
import Hero from '@/components/Hero'
import EventCalendar from '@/components/EventCalendar'
import MenuHero from '@/components/MenuHero'
import Visit from '@/components/Visit'
import Footer from '@/components/Footer'

// Fecha de cartelera evaluada en cada solicitud; no queda congelada en el build.
export const dynamic = 'force-dynamic'
export default function Home() {
  return <>
    {business.demo && <aside className="border-b border-ink/15 bg-surface-elevated px-5 py-3 text-center text-xs leading-relaxed"><p className="font-semibold text-brand-primary">{demoCopy.banner}</p><p className="mt-1 text-ink-muted">{demoCopy.detail}</p></aside>}
    <NavBar />
    <main id="contenido"><Hero /><MenuHero />{business.showEvents && <EventCalendar />}<Visit /></main>
    <Footer />
  </>
}
