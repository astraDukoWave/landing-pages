import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { business } from '@/config/business'
import { buildLocalBusinessSchema } from '@/lib/schema'
import DemoNoticeToast from '@/components/DemoNoticeToast'

// Fuentes autohospedadas (Pista C1): el build ya no depende de fonts.googleapis.com.
const bebasNeue = localFont({
  src: '../public/fonts/bebas-neue-v16-latin-400.woff2',
  weight: '400',
  variable: '--font-bebas',
  display: 'swap',
})

const inter = localFont({
  src: [
    { path: '../public/fonts/inter-v20-latin-400.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/inter-v20-latin-500.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/inter-v20-latin-600.woff2', weight: '600', style: 'normal' },
    { path: '../public/fonts/inter-v20-latin-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-inter',
  display: 'swap',
})

// Fuente única de metadata (antes duplicada entre layout.tsx y page.tsx).
export const metadata: Metadata = {
  metadataBase: new URL(business.baseUrl),
  title: business.seo.title,
  description: business.seo.description,
  keywords: business.seo.keywords.join(', '),
  alternates: {
    canonical: business.baseUrl,
  },
  openGraph: {
    title: business.seo.title,
    description: business.seo.description,
    url: business.baseUrl,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: business.seo.title,
    description: business.seo.description,
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
        className={`${bebasNeue.variable} ${inter.variable} bg-surface text-ink font-body`}
      >
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildLocalBusinessSchema()) }}
        />
        {children}
        {business.whatsapp.mode === 'demo' && <DemoNoticeToast />}
      </body>
    </html>
  )
}
