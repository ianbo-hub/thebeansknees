/** @type {import('tailwindcss').Config} */
export default {
  // darkMode explicitly set to 'media' (Tailwind v3.4+ ignores `false`; use
  // index.html :root { color-scheme: light } to lock the browser to light mode).
  // No dark: variant classes are used anywhere in this codebase.
  darkMode: 'media',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50:  '#F4EAD8',   /* page bg — warm parchment */
          100: '#E8D9C0',   /* card surfaces */
          200: '#D9C7A8',   /* dividers, skeletons */
        },
        brown: {
          300: '#C49A6C',
          400: '#9B6B3A',
          600: '#6B3D1E',
          900: '#3E2009',
        },
        amber: {
          brand: '#C8873E',
          light: '#F0C98A',
        },
        espresso:  '#1A0E05',
        whatsapp:  '#25D366',
      },
      fontFamily: {
        display: ['"Grand Hotel"', 'cursive'],
        body:    ['"Cormorant Garamond"', 'Georgia', 'serif'],
        ui:      ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.32,0.72,0,1)',
        expo:   'cubic-bezier(0.87,0,0.13,1)',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%':   { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        toastIn: {
          '0%':   { opacity: '0', transform: 'translateX(calc(100% + 1rem))' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer:  'shimmer 1.8s ease-in-out infinite',
        ticker:   'ticker 30s linear infinite',
        fadeUp:   'fadeUp 0.6s cubic-bezier(0.32,0.72,0,1) forwards',
        slideIn:  'slideIn 0.45s cubic-bezier(0.32,0.72,0,1) forwards',
        toastIn:  'toastIn 0.35s cubic-bezier(0.32,0.72,0,1) forwards',
        slideUp:  'slideUp 0.5s cubic-bezier(0.32,0.72,0,1) forwards',
      },
    },
  },
  plugins: [],
}
