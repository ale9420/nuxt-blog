export const useScroll = () => {
  const lastScroll = ref<number>(0)
  const showHeader = ref(true)

  const onScroll = () => {
    const currentScrollTop =
      window.scrollY || document.documentElement.scrollTop
    showHeader.value = currentScrollTop < lastScroll.value
    lastScroll.value = currentScrollTop <= 0 ? 0 : currentScrollTop
  }

  onMounted(() => {
    document.addEventListener('scroll', onScroll)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('scroll', onScroll)
  })

  return { showHeader }
}
