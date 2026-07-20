import type { Metadata } from 'next'
import { Bebas_Neue, Inter } from 'next/font/google'
import './globals.css'

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Paco's Wings & Beer — Cholula",
  description:
    'Wings. Chela. Cholula. Av. Ferrocarril 707. Transmisiones en vivo, ambiente festivo, lun-mar y jue-dom 1PM-10PM.',
  openGraph: {
    title: "Paco's Wings & Beer — Cholula",
    description:
      'Wings. Chela. Cholula. Av. Ferrocarril 707. Transmisiones en vivo, ambiente festivo, lun-mar y jue-dom 1PM-10PM.',
    images: [
      {
        url: 'https://placehold.co/1200x630/0A0A0A/F5F5F5?text=Paco%27s+Wings+%26+Beer',
        width: 1200,
        height: 630,
        alt: "Paco's Wings & Beer",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body
        className={`${bebasNeue.variable} ${inter.variable} bg-pacos-black text-pacos-white font-body`}
      >
        {children}
      </body>
    </html>
  )
}
