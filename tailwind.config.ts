import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Crimson Text', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        // Custom warm, cozy colors
        'sage': {
          DEFAULT: 'rgb(147, 167, 142)',
          'light': 'rgb(167, 187, 162)',
          'dark': 'rgb(127, 147, 122)',
        },
        'cream': 'rgb(252, 250, 247)',
        'warm-beige': 'rgb(240, 235, 225)',
        'soft-blush': {
          DEFAULT: 'rgb(242, 220, 215)',
          'light': 'rgb(248, 235, 230)',
        },
        'terracotta': 'rgb(205, 133, 108)',
        'forest-green': 'rgb(85, 107, 80)',
        'warm-brown': 'rgb(139, 115, 95)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'gentle-sway': {
          '0%, 100%': { transform: 'rotate(0deg) translateY(0px)' },
          '25%': { transform: 'rotate(1deg) translateY(-2px)' },
          '50%': { transform: 'rotate(0deg) translateY(-4px)' },
          '75%': { transform: 'rotate(-1deg) translateY(-2px)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'bloom': {
          '0%': { transform: 'scale(0.8) rotate(-5deg)', opacity: '0.7' },
          '50%': { transform: 'scale(1.05) rotate(2deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        'leaf-rustle': {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)' },
          '25%': { transform: 'rotate(2deg) scale(1.02)' },
          '75%': { transform: 'rotate(-2deg) scale(0.98)' },
        },
        'fade-in-up': {
          from: {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'gentle-sway': 'gentle-sway 4s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'bloom': 'bloom 0.6s ease-out',
        'leaf-rustle': 'leaf-rustle 3s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out',
        'shimmer': 'shimmer 2s infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;