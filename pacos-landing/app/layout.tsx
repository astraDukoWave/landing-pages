import type { Metadata } from 'next'
import { Bebas_Neue, Inter } from 'next/font/google'
import './globals.css'
import { business } from '@/config/business'

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

// Fuente única de metadata (antes duplicada entre layout.tsx y page.tsx).
export const metadata: Metadata = {
  title: business.seo.title,
  description: business.seo.description,
  keywords: business.seo.keywords.join(', '),
  openGraph: {
    title: business.seo.title,
    description: business.seo.description,
    url: business.baseUrl,
    type: 'website',
    images: [
      {
        url: 'https://placehold.co/1200x630/0A0A0A/F5F5F5?text=Paco%27s+Wings+%26+Beer',
        width: 1200,
        height: 630,
        alt: business.seo.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: business.seo.title,
    description: business.seo.description,
    images: [
      'https://placehold.co/1200x630/0A0A0A/F5F5F5?text=Paco%27s+Wings+%26+Beer',
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
