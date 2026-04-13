/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Neo-Brutalism Palette
        'brand': '#2563EB', // Electric Blue (primary accent)
        'dark': '#000000',
        'light': '#FFFFFF',
        // Legacy colors (kept for transition)
        bg: '#FFFFFF',
        surface: '#F9F9F9',
        'surface-2': '#F5F5F5',
        'text-primary': '#000000',
        'text-secondary': '#4B5563',
        'text-muted': '#6B7280',
        'accent-blue': '#2563EB',
        'accent-violet': '#8B5CF6',
        'accent-yellow': '#FFD400',
      },
      fontFamily: {
        // Neo-Brutalism fonts
        'grotesk': ['Space Grotesk', 'sans-serif'],
        'archivo': ['Archivo Black', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderWidth: {
        // Neo-Brutalism default borders
        '4': '4px',
        'brutal': '4px',
      },
      borderColor: {
        default: '#000000',
        subtle: '#000000',
      },
      boxShadow: {
        // Hard shadow only (no soft shadows)
        'brutal': '4px 4px 0px #000000',
        'brutal-hover': '6px 6px 0px #000000',
        'card': '4px 4px 0px #000000',
        'card-hover': '6px 6px 0px #000000',
        none: 'none',
      },
      borderRadius: {
        'none': '0px',
        'minimal': '2px',
        'sm': '4px',
        DEFAULT: '0px', // Sharp corners by default
      },
    },
  },
  plugins: [],
}

