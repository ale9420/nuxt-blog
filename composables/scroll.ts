export const useScroll = () => {
  const lastScroll = ref<number>(0)
  const showHeader = ref(true)

  const onScroll = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop
    showHeader.value = scrollY < lastScroll.value
    lastScroll.value = scrollY
  }

  onMounted(() => {
    document.addEventListener('scroll', onScroll)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('scroll', onScroll)
  })

  return { showHeader }
}
