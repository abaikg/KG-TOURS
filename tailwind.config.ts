import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sage Green (Background & Accents)
        sage: {
          50: '#F5F7F5',
          100: '#E8EDE8',
          200: '#D4E4D4',
          300: '#C8D5C8',
          400: '#A8BFA8',
          500: '#7FA87F',
        },
        // Forest Green (Text & Dark Elements)
        forest: {
          700: '#2D5F4D',
          800: '#1A3A2E',
          900: '#0F2419',
        },
        // Neutral Warm Tones
        cream: '#FDFCFA',
        'warm-white': '#F5F3EE',
        charcoal: '#2C3E3B',
        // Accents
        gold: '#F4C430',
        amber: '#FFB84D',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'hero': ['48px', { lineHeight: '1.1', fontWeight: '800' }],
        'h1': ['36px', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['28px', { lineHeight: '1.3', fontWeight: '700' }],
        'h3': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
      },
      spacing: {
        'xs': '8px',
        'sm': '12px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      borderRadius: {
        'sm': '12px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        'pill': '9999px',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.06)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.08)',
        'float': '0 12px 48px rgba(0, 0, 0, 0.12)',
      },
      transitionTimingFunction: {
        'nature': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      animation: {
        'fade-in': 'fade-in 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-up': 'slide-up 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'scale-in': 'scale-in 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
