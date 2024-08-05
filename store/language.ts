import type { Language, Locale } from '@/types'

export const useLanguageStore = defineStore('language', () => {
  const { setLocale } = useI18n({ useScope: 'global' })
  const strapiLocale = ref('en')
  const languages = ref<Language[]>([
    { value: 'en', label: 'English', code: 'en' },
    { value: 'es', label: 'Español', code: 'es-CO' },
  ])

  async function updateLanguage(lang: Locale) {
    await setLocale(lang)
    const language = {
      ...languages.value.find((i) => i.value === lang),
    } as Language
    strapiLocale.value = language.code
  }

  return { languages, locale: strapiLocale, updateLanguage }
})
