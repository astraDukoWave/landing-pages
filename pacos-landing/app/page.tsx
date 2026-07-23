import NavBar from '@/components/NavBar'
import Hero from '@/components/Hero'
import EventCalendar from '@/components/EventCalendar'
import MenuHero from '@/components/MenuHero'
import Footer from '@/components/Footer'

// Metadata: fuente única en app/layout.tsx (derivada de config/business.ts).
export default function Home() {
  return (
    <main className="bg-surface">
      <NavBar />
      <Hero />
      <EventCalendar />
      <MenuHero />
      <Footer />
    </main>
  )
}
