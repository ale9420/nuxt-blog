<template>
  <div v-if="isMobile" class="flex flex-col gap-3 w-full">
    <PostMobileCard
      v-for="post of posts?.data?.posts?.data"
      :key="+post.id"
      :post="post.attributes"
    />
  </div>
  <div
    v-else
    class="sm:flex sm:flex-col gap-3 md:grid md:grid-cols-2 lg:grid-cols-3"
  >
    <PostCard
      v-for="post of posts?.data?.posts?.data"
      :key="+post.id"
      :post="post.attributes"
    />
  </div>
</template>

<script lang="ts" setup>
const viewport = useViewport()
const postStore = usePostStore()
const languageStore = useLanguageStore()
const { locale } = storeToRefs(languageStore)
const { posts } = storeToRefs(postStore)
const isMobile = computed(() => viewport.isLessThan('tablet'))

useSeoMeta({
  title: 'BOG.DEV Blog',
  description: 'Este es un blog donde nos enfocaremos en tecnologias web TI',
})

onServerPrefetch(async () => {
  await postStore.fetchPosts()
})

onMounted(async () => {
  if (!posts.value) {
    await postStore.fetchPosts()
  }
})

watch(locale, async () => {
  await postStore.fetchPosts()
})
</script>
