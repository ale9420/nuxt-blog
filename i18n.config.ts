import en from './language/en'
import es from './language/es'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en,
    es,
  },
}))
