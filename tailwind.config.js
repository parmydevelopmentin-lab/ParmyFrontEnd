export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors - Royal Purple (Luxury, Premium, Corporate Excellence)
        primary: {
          50: '#faf5ff',    // Very light - elegance, refinement
          100: '#f3e8ff',   // Light - sophistication, grace
          200: '#e9d5ff',   // Lighter - luxury, premium
          300: '#d8b4fe',   // Medium light - royalty, nobility
          400: '#c084fc',   // Medium - prestige, excellence
          500: '#6366f1',   // Main brand - royal purple, authority
          600: '#4338ca',   // Darker - power, confidence
          700: '#3730a3',   // Dark - premium, exclusive
          800: '#312e81',   // Very dark - luxury, depth
          900: '#1e1b4b',   // Darkest - elite, sophisticated
          950: '#0f0a2e',   // Ultra dark - mysterious, premium
        },
        
        // Secondary Colors - Elegant Gold (Luxury, Prestige, Success)
        secondary: {
          50: '#fffbeb',    // Lightest gold - warmth, luxury
          100: '#fef3c7',   // Light gold - prosperity, success
          200: '#fde68a',   // Lighter gold - elegance, refinement
          300: '#fcd34d',   // Medium light - prestige, achievement
          400: '#fbbf24',   // Medium gold - wealth, excellence
          500: '#f59e0b',   // Main secondary - elegant gold, luxury
          600: '#d97706',   // Darker gold - confidence, authority
          700: '#b45309',   // Dark gold - premium, exclusive
          800: '#92400e',   // Very dark - sophisticated, rich
          900: '#78350f',   // Darkest - elite, prestigious
          950: '#451a03',   // Ultra dark - mysterious luxury
        },
        
        // Accent Colors - Pure White with Purple Shadows (Elegance, Purity, Contrast)
        accent: {
          50: '#ffffff',    // Pure white - elegance, purity
          100: '#fefefe',   // Almost white - clean, refined
          200: '#fafafa',   // Very light gray - subtle, sophisticated
          300: '#f5f5f5',   // Light gray - balanced, harmonious
          400: '#e5e5e5',   // Medium light - contrast, clarity
          500: '#ffffff',   // Main accent - pure white, elegance
          600: '#d4d4d8',   // Darker - professional, grounded
          700: '#a1a1aa',   // Dark - authority, stability
          800: '#71717a',   // Very dark - premium, exclusive
          900: '#52525b',   // Darkest - sophisticated, elite
          950: '#09090b',   // Ultra dark - mysterious, premium
        },
        
        // Neutral Grays - Sophisticated and Modern
        neutral: {
          50: '#fafafa',    // Almost white - clean, pure
          100: '#f5f5f5',   // Very light - minimal, modern
          200: '#e5e5e5',   // Light - subtle, refined
          300: '#d4d4d4',   // Medium light - balanced, harmonious
          400: '#a3a3a3',   // Medium - sophisticated, timeless
          500: '#737373',   // Main neutral - professional, stable
          600: '#525252',   // Darker - authoritative, grounded
          700: '#404040',   // Dark - premium, elegant
          800: '#262626',   // Very dark - luxury, exclusive
          900: '#171717',   // Darkest - elite, sophisticated
          950: '#0a0a0a',   // Ultra dark - mysterious, premium
        },
        
        // Surface Colors - Royal Purple inspired backgrounds
        surface: {
          light: '#ffffff',           // Pure white - clean, professional
          'light-secondary': '#faf5ff', // Off-white with purple tint - subtle, refined
          dark: '#1e1b4b',           // Deep royal purple - sophisticated, premium
          'dark-secondary': '#312e81', // Lighter royal purple - balanced, modern
          'dark-tertiary': '#3730a3', // Medium royal purple - approachable luxury
        },
        
        // Status Colors - Emotionally appropriate
        success: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',   // Growth, achievement (gold)
          600: '#d97706',   // Confidence, success
          700: '#b45309',   // Stability, trust
        },
        
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',   // Attention, caution
          600: '#d97706',   // Importance, urgency
          700: '#b45309',   // Strong warning
        },
        
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',   // Alert, danger
          600: '#dc2626',   // Critical, stop
          700: '#b91c1c',   // Severe, urgent
        },
        
        info: {
          50: '#faf5ff',
          100: '#f3e8ff',
          500: '#6366f1',   // Information, guidance (royal purple)
          600: '#4338ca',   // Important info
          700: '#3730a3',   // Critical info
        },
      },
      
      // Enhanced spacing for better visual rhythm
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '100': '25rem',
        '128': '32rem',
      },
      
      // Royal Purple & Gold inspired gradients
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        'gradient-accent': 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
        'gradient-success': 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)',
        'gradient-dark': 'linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)',
        'gradient-hero': 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #3730a3 100%)',
        'gradient-premium': 'linear-gradient(135deg, #6366f1 0%, #f59e0b 50%, #4338ca 100%)',
        'gradient-royal': 'linear-gradient(135deg, #6366f1 0%, #f59e0b 25%, #4338ca 50%, #d97706 75%, #3730a3 100%)',
        'gradient-luxury': 'linear-gradient(45deg, #6366f1 0%, #f59e0b 50%, #6366f1 100%)',
      },
      
      // Royal-themed shadows with purple and gold tones
      boxShadow: {
        'primary': '0 4px 14px 0 rgba(99, 102, 241, 0.25)',
        'primary-lg': '0 10px 25px -3px rgba(99, 102, 241, 0.35), 0 4px 6px -2px rgba(99, 102, 241, 0.1)',
        'secondary': '0 4px 14px 0 rgba(245, 158, 11, 0.25)',
        'secondary-lg': '0 10px 25px -3px rgba(245, 158, 11, 0.35), 0 4px 6px -2px rgba(245, 158, 11, 0.1)',
        'accent': '0 4px 14px 0 rgba(255, 255, 255, 0.25)',
        'accent-lg': '0 10px 25px -3px rgba(255, 255, 255, 0.35), 0 4px 6px -2px rgba(255, 255, 255, 0.1)',
        'premium': '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
        'glow-primary': '0 0 20px rgba(99, 102, 241, 0.3)',
        'glow-secondary': '0 0 20px rgba(245, 158, 11, 0.3)',
        'glow-accent': '0 0 20px rgba(255, 255, 255, 0.3)',
        'royal-glow': '0 8px 32px rgba(99, 102, 241, 0.15), 0 4px 16px rgba(245, 158, 11, 0.1)',
      },
      
      // Refined animations that feel premium
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-primary': 'pulsePrimary 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'royal-pulse': 'royalPulse 2s ease-out infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulsePrimary: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(99, 102, 241, 0.7)' },
          '70%': { boxShadow: '0 0 0 10px rgba(99, 102, 241, 0)' },
        },
        pulseGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)',
            transform: 'scale(1)',
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(99, 102, 241, 0.6)',
            transform: 'scale(1.02)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%, 100%': { 
            transform: 'translateX(0) translateY(0)',
            boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)'
          },
          '25%': { 
            transform: 'translateX(3px) translateY(-3px)',
            boxShadow: '0 0 25px rgba(245, 158, 11, 0.4)'
          },
          '50%': { 
            transform: 'translateX(0) translateY(-6px)',
            boxShadow: '0 0 30px rgba(245, 158, 11, 0.5)'
          },
          '75%': { 
            transform: 'translateX(-3px) translateY(-3px)',
            boxShadow: '0 0 25px rgba(245, 158, 11, 0.4)'
          },
        },
        royalPulse: {
          '0%': { 
            transform: 'scale(0.95)',
            opacity: '1',
            boxShadow: '0 0 0 0 rgba(99, 102, 241, 0.7)'
          },
          '70%': { 
            transform: 'scale(1)',
            opacity: '0.9',
            boxShadow: '0 0 0 10px rgba(99, 102, 241, 0)'
          },
          '100%': { 
            transform: 'scale(0.95)',
            opacity: '1',
            boxShadow: '0 0 0 0 rgba(99, 102, 241, 0)'
          },
        },
      },
      
      // Typography enhancements for better hierarchy
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
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
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
