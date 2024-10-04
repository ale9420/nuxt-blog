import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('vue:error', (err) => {
    throw new Error(err?.toString())
  })
})
