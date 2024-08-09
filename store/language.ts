import type { Language } from '@/types'

export const useLanguageStore = defineStore('language', () => {
  const { locale, setLocale } = useI18n({ useScope: 'global' })
  const languages = ref<Language[]>([
    { value: 'en', label: 'English', code: 'en' },
    { value: 'es', label: 'Español', code: 'es-CO' },
  ])
  const language = ref<Language>(
    languages.value.find((i) => i.value === locale.value) as Language
  )

  async function updateLanguage(lang: Language) {
    await setLocale(lang.value)
    language.value = lang
  }

  return { languages, language, locale, updateLanguage }
})
