<template>
  <div>
    <div
      class="gap-3 w-full sm:flex sm:justify-items-center sm:flex-col md:grid md:grid-cols-2 lg:grid-cols-3"
    >
      <PostCard
        v-for="post of posts?.data?.posts?.data"
        :id="post.id"
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
const { t } = useI18n({ useScope: 'global' })

onServerPrefetch(async () => {
  await postStore.fetchPosts()
})

onMounted(async () => {
  if (!posts.value) await postStore.fetchPosts()
})

watch(language, async () => {
  await postStore.fetchPosts()
})

useSeoMeta({
  title: t('meta.title'),
  ogTitle: t('meta.title'),
  description: t('meta.description'),
  ogDescription: t('meta.description'),
})
</script>
