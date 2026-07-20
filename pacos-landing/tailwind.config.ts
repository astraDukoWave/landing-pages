import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pacos: {
          black: '#0A0A0A',
          fire: '#FF4500',
          'fire-dark': '#CC3700',
          amber: '#FF8C00',
          white: '#F5F5F5',
          gray: '#1A1A1A',
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

