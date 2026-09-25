import { ImageResponse } from 'next/og'
import { business, siteTitle } from '@/config/business'
import { theme } from '@/config/theme'

export const alt = siteTitle
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.surface,

        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 148,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: theme.accent,
            lineHeight: 1,
          }}
        >
          {business.shortName}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 12,
            fontSize: 40,
            fontWeight: 600,
            letterSpacing: '0.3em',
            color: theme.ink,
          }}
        >
          {business.subtitle}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 40,
            fontSize: 26,
            color: theme.muted,
          }}
        >
          {business.demo ? 'PROPUESTA WEB · DEMOSTRACIÓN' : `${business.address.city}, ${business.address.region}`} 
        </div>
      </div>
    ),
    { ...size }
  )
}
