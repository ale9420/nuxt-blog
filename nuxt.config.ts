import gql from '@rollup/plugin-graphql'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@nuxtjs/strapi', '@nuxt/eslint', '@nuxt/image'],
  devtools: { enabled: true },
  imports: { dirs: ['store'] },
  css: ['~/public/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  strapi: {
    url: process.env.STRAPI_URL,
  },
  runtimeConfig: {
    public: {
      ghostContentUrl: process.env.GHOST_CONTENT_URL,
      ghostApiKey: process.env.GHOST_API_KEY,
    },
  },
  image: {
    strapi: {
      baseURL: process.env.STRAPI_URL,
    },
  },
  vite: {
    plugins: [gql()],
  },
  compatibilityDate: '2024-07-26',
})
