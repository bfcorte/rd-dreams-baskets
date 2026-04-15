import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50:  '#FDFAF5',
          100: '#FAF7F0',
          200: '#F5EFE0',
          300: '#EDE3CC',
          400: '#DDD0B5',
        },
        rust: {
          400: '#C4624A',
          500: '#A8492F',
          600: '#8B3322',
          700: '#6D2218',
        },
        gold: {
          300: '#DDB882',
          400: '#C49A6C',
          500: '#B8814A',
          600: '#9B6830',
        },
        sage: {
          300: '#9DB89A',
          400: '#7A9B76',
          500: '#607D5C',
          600: '#4A6146',
        },
        bark: {
          700: '#5C3D1E',
          800: '#3D2B1A',
          900: '#241A0F',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)',    'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'texture': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c49a6c' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        'float':       'float 6s ease-in-out infinite',
        'float-slow':  'float 9s ease-in-out infinite',
        'float-fast':  'float 4s ease-in-out infinite',
        'fade-up':     'fadeUp 0.7s ease-out both',
        'breathe':     'breathe 5s ease-in-out infinite',
        'spin-slow':   'spin 20s linear infinite',
        'ping-slow':   'ping 3s cubic-bezier(0,0,0.2,1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-10px)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%':       { transform: 'scale(1.018)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
