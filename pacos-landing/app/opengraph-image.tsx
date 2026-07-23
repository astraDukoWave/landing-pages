import { ImageResponse } from 'next/og'
import { business } from '@/config/business'

export const alt = business.seo.title
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
          backgroundColor: '#0A0A0A',
          backgroundImage:
            'radial-gradient(circle at 30% 20%, rgba(255,69,0,0.35), transparent 55%), radial-gradient(circle at 80% 80%, rgba(255,140,0,0.25), transparent 50%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 148,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#FF4500',
            lineHeight: 1,
          }}
        >
          PACO&apos;S
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 12,
            fontSize: 40,
            fontWeight: 600,
            letterSpacing: '0.3em',
            color: '#F5F5F5',
          }}
        >
          WINGS &amp; BEER
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 40,
            fontSize: 26,
            color: 'rgba(245,245,245,0.6)',
          }}
        >
          Cholula, Puebla
        </div>
      </div>
    ),
    { ...size }
  )
}
