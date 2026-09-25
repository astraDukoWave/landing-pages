import { ImageResponse } from 'next/og'
import { business } from '@/config/business'
import { theme } from '@/config/theme'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
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
          color: theme.onPrimary,
          fontSize: 108,
          fontWeight: 800,
        }}
      >
        {business.shortName.charAt(0)}
      </div>
    ),
    { ...size }
  )
}
