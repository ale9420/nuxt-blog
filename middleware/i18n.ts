export default defineNuxtRouteMiddleware((_to, _from) => {
  const locale = localStorage.getItem('locale')
  if (locale) {
    const { $i18n } = useNuxtApp()
    $i18n.setLocale(locale)
  }
})
