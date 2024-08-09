<template>
  <div v-if="isMobile" class="flex flex-col gap-3 w-full">
    <PostMobileCard
      v-for="post of posts?.data?.posts?.data"
      :key="+post.id"
      :post="post.attributes"
    />
  </div>
  <div v-else>
    <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
      <PostCard
        v-for="post of posts?.data?.posts?.data"
        :key="+post.id"
        :post="post.attributes"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const viewport = useViewport()
const postStore = usePostStore()
const languageStore = useLanguageStore()
const { language } = storeToRefs(languageStore)
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

watch(language, async () => {
  await postStore.fetchPosts()
})
</script>
