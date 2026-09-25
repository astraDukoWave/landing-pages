import { ImageResponse } from 'next/og'
import { business } from '@/config/business'
import { theme } from '@/config/theme'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.primary,
          borderRadius: 6,
          color: theme.onPrimary,
          fontSize: 22,
          fontWeight: 800,
        }}
      >
        {business.shortName.charAt(0)}
      </div>
    ),
    { ...size }
  )
}
