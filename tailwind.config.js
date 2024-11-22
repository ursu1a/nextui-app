import {
  nextui
} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: ["var(--font-manrope)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      dark: {
        colors: {
          primary: {
            DEFAULT: '#1a80e5',
            foreground: '#ffffff'
          },
          default: {
            100: '#243647',
            400: '#94adc7',
            700: '#ffffff',
          },
          background: {
            DEFAULT: '#121A21',
            foreground: "#ffffff"
          }
        }
      },
    }
  })],
}