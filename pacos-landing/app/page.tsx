import type { Metadata } from 'next'
import NavBar from '@/components/NavBar'
import Hero from '@/components/Hero'
import EventCalendar from '@/components/EventCalendar'
import MenuHero from '@/components/MenuHero'
import Footer from '@/components/Footer'

export const generateMetadata = async (): Promise<Metadata> => ({
  title: "Paco's Wings & Beer — Cholula",
  description:
    'Wings, chelas frías y transmisiones en vivo de peleas y partidos. Encuentra el mejor bar deportivo en Cholula.',
  keywords:
    'bar, Cholula, wings, chelas, peleas de box, eventos deportivos, restaurante',
  openGraph: {
    title: "Paco's Wings & Beer — Cholula",
    description:
      'Wings, chelas frías y transmisiones en vivo. El mejor ambiente para disfrutar del deporte.',
    url: 'https://pacoswingsandbeer.com',
    type: 'website',
    images: [
      {
        url: 'https://placehold.co/1200x630/0A0A0A/F5F5F5?text=Paco%27s+Wings+%26+Beer',
        width: 1200,
        height: 630,
        alt: "Paco's Wings & Beer",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Paco's Wings & Beer — Cholula",
    description:
      'Wings, chelas frías y transmisiones en vivo de peleas y partidos.',
    images: [
      'https://placehold.co/1200x630/0A0A0A/F5F5F5?text=Paco%27s+Wings+%26+Beer',
    ],
  },
})

export default function Home() {
  return (
    <main className="bg-pacos-black">
      <NavBar />
      <Hero />
      <EventCalendar />
      <MenuHero />
      <Footer />
    </main>
  )
}
