import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Capa base: paleta cruda de Paco's. No se consume directo en components/
        // (regla acotada REQ-01) — la capa semántica de abajo es el contrato de consumo.
        pacos: {
          black: '#0A0A0A',
          fire: '#FF4500',
          'fire-dark': '#CC3700',
          amber: '#FF8C00',
          white: '#F5F5F5',
          gray: '#1A1A1A',
        },
        // Capa semántica: lo único que components/ debe usar para identidad y estado.
        brand: {
          primary: '#FF4500',
          'primary-strong': '#CC3700',
          accent: '#FF8C00',
        },
        surface: '#0A0A0A',
        'surface-elevated': '#1A1A1A',
        ink: '#F5F5F5',
        'ink-muted': '#7F7F7F',
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

