import type { Config } from 'tailwindcss'
import { theme } from './config/theme'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Capa base: paleta cruda de Paco's. No se consume directo en components/
        // (regla acotada REQ-01) — la capa semántica de abajo es el contrato de consumo.
        pacos: {
          black: theme.surface,
          fire: theme.primary,
          'fire-dark': theme.primaryStrong,
          amber: theme.accent,
          white: theme.ink,
          gray: theme.elevated,
        },
        // Capa semántica: lo único que components/ debe usar para identidad y estado.
        brand: {
          primary: theme.primary,
          onPrimary: theme.onPrimary,
          'primary-strong': theme.primaryStrong,
          accent: theme.accent,
        },
        surface: theme.surface,
        'surface-elevated': theme.elevated,
        ink: theme.ink,
        'ink-muted': theme.muted,
        state: {
          live: '#DC2626',
          confirmed: '#10B981',
          pending: '#B0B0B0',
        },
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config

