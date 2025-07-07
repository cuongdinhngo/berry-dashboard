import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration'

export default defineVuetifyConfiguration({
  theme: {
    defaultTheme: 'berry',
    themes: {
      berry: {
        dark: false,
        colors: {
          // Primary Berry colors
          primary: '#1e88e5',
          'primary-darken-1': '#1f5592',
          'primary-lighten-1': '#7084EA',
          
          // Secondary colors
          secondary: '#5e35b1',
          'secondary-darken-1': '#E8851A',
          'secondary-lighten-1': '#F9A347',
          
          // Accent colors
          accent: '#8C90FC',
          'accent-darken-1': '#7A7EFA',
          'accent-lighten-1': '#9EA2FD',
          
          // Status colors
          error: '#F5365C',
          'error-darken-1': '#F31B42',
          'error-lighten-1': '#F65076',
          
          warning: '#FB6340',
          'warning-darken-1': '#FA4A24',
          'warning-lighten-1': '#FC7C5C',
          
          info: '#11CDEF',
          'info-darken-1': '#0BB8DC',
          'info-lighten-1': '#2DD5F2',
          
          success: '#2DCE89',
          'success-darken-1': '#25B576',
          'success-lighten-1': '#47D69C',
          
          // Surface colors
          surface: '#FFFFFF',
          'surface-variant': '#424242',
          'surface-bright': '#FFFFFF',
          'surface-light': '#eeeeee',
          'surface-dark': '#F1F3F4',
          
          // Background colors
          background: '#FFFFFF',
          'on-background': '#212529',
          
          // Text colors
          'on-surface': '#212529',
          'on-surface-variant': '#6C757D',
          'on-primary': '#FFFFFF',
          'on-secondary': '#FFFFFF',
          'on-accent': '#FFFFFF',
          'on-error': '#FFFFFF',
          'on-warning': '#FFFFFF',
          'on-info': '#FFFFFF',
          'on-success': '#FFFFFF',
          
          // Grey palette
          'grey-50': '#FAFAFA',
          'grey-100': '#F5F5F5',
          'grey-200': '#EEEEEE',
          'grey-300': '#E0E0E0',
          'grey-400': '#BDBDBD',
          'grey-500': '#9E9E9E',
          'grey-600': '#757575',
          'grey-700': '#616161',
          'grey-800': '#424242',
          'grey-900': '#212121',
          
          // Additional Berry Dashboard colors
          'berry-light': '#F8F9FA',
          'berry-dark': '#343A40',
          'berry-purple': '#6F42C1',
          'berry-pink': '#E83E8C',
          'berry-cyan': '#17A2B8',
          'berry-teal': '#20C997',
          'berry-yellow': '#FFC107',
          'berry-orange': '#FD7E14',
          'berry-red': '#DC3545',
          'berry-green': '#28A745',
          'berry-blue': '#007BFF',
          'berry-indigo': '#6610F2',
        }
      },
      // Dark theme variant
      'berry-dark': {
        dark: true,
        colors: {
          primary: '#5E72E4',
          secondary: '#F7931E',
          accent: '#8C90FC',
          error: '#F5365C',
          warning: '#FB6340',
          info: '#11CDEF',
          success: '#2DCE89',
          surface: '#1E1E1E',
          background: '#121212',
          'on-surface': '#FFFFFF',
          'on-background': '#FFFFFF',
        }
      }
    }
  },
  defaults: {

  },
  display: {
    mobileBreakpoint: 'sm',
    thresholds: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  icons: {
    defaultSet: 'mdi',
  },
})
