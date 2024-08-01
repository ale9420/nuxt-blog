/** @type {import('tailwindcss').Config} */
import { screens } from './constants/screens'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      screens,
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontWeight: '500',
            },
          },
        },
      },
    },
  },
}
