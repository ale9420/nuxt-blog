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
  safelist: [...Array.from({ length: 100 }, (_, i) => `w-[${i + 1}rem]`)],
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
