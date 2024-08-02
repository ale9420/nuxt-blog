import type { Language } from '@/types'

export const useLanguageStore = defineStore('language', () => {
  const { locale, setLocale } = useI18n()
  const language = ref<Language>()

  const languages = ref<Language[]>([
    { value: 'en', label: 'English', code: 'en' },
    { value: 'es', label: 'Español', code: 'es-CO' },
  ])

  async function updateLanguage(locale: string) {
    await setLocale(locale)
    language.value = languages.value.find((i) => i.value === locale)

    console.log(language.value)
    console.log(locale)
  }

  // watch(locale, (newValue) => updateLanguage(newValue))

  return { languages, language, locale, updateLanguage }
})
