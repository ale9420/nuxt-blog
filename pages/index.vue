<template>
  <div>
    <div
      class="gap-3 w-full sm:flex sm:justify-items-center sm:flex-col md:grid md:grid-cols-2 lg:grid-cols-3"
    >
      <PostCard
        v-for="post of posts?.data?.posts?.data"
        :key="+post.id"
        :post="post.attributes"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const postStore = usePostStore()
const languageStore = useLanguageStore()
const { language } = storeToRefs(languageStore)
const { posts } = storeToRefs(postStore)

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
