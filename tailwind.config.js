/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Breakpoints personnalisés pour une meilleure responsive
      screens: {
        'xs': '475px',      // Très petits écrans
        'sm': '640px',      // Petits écrans (défaut Tailwind)
        'md': '768px',      // Tablettes (défaut Tailwind)
        'lg': '1024px',     // Desktop (défaut Tailwind)
        'xl': '1280px',     // Grand desktop (défaut Tailwind)
        '2xl': '1536px',    // Très grand desktop (défaut Tailwind)
        // Breakpoints pour orientations
        'portrait': { 'raw': '(orientation: portrait)' },
        'landscape': { 'raw': '(orientation: landscape)' },
        // Breakpoints pour touch devices
        'touch': { 'raw': '(hover: none) and (pointer: coarse)' },
        'mouse': { 'raw': '(hover: hover) and (pointer: fine)' },
      },

      // Espacement responsive optimisé
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },

      // Tailles de police fluides
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
      },

      // Container personnalisé
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          xs: '1rem',
          sm: '1.5rem',
          md: '2rem',
          lg: '2.5rem',
          xl: '3rem',
          '2xl': '4rem',
        },
      },

      // Touch target minimums
      minHeight: {
        'touch': '44px',  // Apple HIG recommandation
      },
      minWidth: {
        'touch': '44px',
      },

      // Couleurs personnalisées ArchiAtech
      colors: {
        'archiatech': {
          red: '#E60023',
          'red-dark': '#C62828',
          'red-light': '#E53935',
        },
      },

      // Z-index organisé
      zIndex: {
        'modal': '1000',
        'dropdown': '100',
        'navigation': '50',
        'video': '10',
      },

      // Animations personnalisées
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
