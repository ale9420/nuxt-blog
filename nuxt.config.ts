import gql from '@rollup/plugin-graphql'
import tailwindTypography from '@tailwindcss/typography'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/strapi',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    'nuxt-strapi-blocks-renderer',
    'nuxt-viewport',
  ],
  i18n: {
    vueI18n: './i18n.config.ts',
    defaultLocale: 'es',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      redirectOn: 'root',
      alwaysRedirect: true,
    },
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        resolveJsonModule: true,
      },
    },
  },
  devtools: { enabled: true },
  imports: { dirs: ['store'] },
  css: ['~/public/main.css'],
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },
  components: {
    dirs: [{ path: '~/components' }],
    global: true,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  tailwindcss: {
    config: {
      plugins: [tailwindTypography],
    },
  },
  strapi: {
    url: process.env.STRAPI_URL,
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
