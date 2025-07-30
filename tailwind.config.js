/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Source Sans Pro"', 'sans-serif'],
        body: ['"Open Sans"', 'sans-serif'],
      },
      colors: {
        primary: {
          50: 'var(--primary-50)',
          100: 'var(--primary-100)',
          200: 'var(--primary-200)',
          300: 'var(--primary-300)',
          400: 'var(--primary-400)',
          500: 'var(--primary-500)',
          600: 'var(--primary-600)',
          700: 'var(--primary-700)',
          800: 'var(--primary-800)',
          900: 'var(--primary-900)',
        },
        secondary: {
          300: 'var(--secondary-300)',
          500: 'var(--secondary-500)',
          700: 'var(--secondary-700)',
        },
        accent: {
          300: 'var(--accent-300)',
          500: 'var(--accent-500)',
          700: 'var(--accent-700)',
        },
        neutral: {
          50: 'var(--neutral-50)',
          100: 'var(--neutral-100)',
          200: 'var(--neutral-200)',
          300: 'var(--neutral-300)',
          400: 'var(--neutral-400)',
          500: 'var(--neutral-500)',
          600: 'var(--neutral-600)',
          700: 'var(--neutral-700)',
          800: 'var(--neutral-800)',
          900: 'var(--neutral-900)',
        },
        success: {
          500: 'var(--success-500)',
        },
        warning: {
          500: 'var(--warning-500)',
        },
        error: {
          500: 'var(--error-500)',
        },
      },
      backgroundImage: {
        'hero-pattern': "url('https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1600')",
        'elearning-pattern': "url('https://images.pexels.com/photos/6592158/pexels-photo-6592158.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1600')",
        'marketplace-pattern': "url('https://images.pexels.com/photos/2284170/pexels-photo-2284170.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1600')",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
    },
  },
  plugins: [],
};