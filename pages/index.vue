<template>
  <div class="w-full">
    <PostFeatured />
    <div class="container mx-auto sm:py-3 lg:p-5">
      <div
        class="gap-3 w-full sm:flex sm:justify-items-center sm:flex-col md:justify-items-stretch md:grid md:grid-cols-2 2xl:grid-cols-3"
      >
        <PostCard
          v-for="post of posts?.data?.posts?.data"
          :id="post.id"
          :key="+post.id"
          :post="post.attributes"
        />
      </div>
      <ClientOnly>
        <UiPagination
          class="mt-6"
          :limit="LIMIT"
          :page="currentPage"
          :page-count="posts?.data?.posts?.meta.pagination.pageCount || 0"
          @page-change="pageChange"
        />
      </ClientOnly>
    </div>
  </div>
</template>

<script lang="ts" setup>
const postStore = usePostStore()
const languageStore = useLanguageStore()
const { language } = storeToRefs(languageStore)
const { posts } = storeToRefs(postStore)
const { t } = useI18n({ useScope: 'global' })
const currentPage = ref(1)
const LIMIT = 10

const pageChange = async (page: number) => {
  currentPage.value = page
  await postStore.fetchPosts(currentPage.value, LIMIT)
}

onServerPrefetch(async () => {
  await postStore.fetchPosts(currentPage.value, LIMIT)
})

onMounted(async () => {
  if (!posts.value) await postStore.fetchPosts(currentPage.value, LIMIT)
})

watch(language, async () => {
  await postStore.fetchPosts(currentPage.value, LIMIT)
})

useSeoMeta({
  title: t('meta.title'),
  ogTitle: t('meta.title'),
  description: t('meta.description'),
  ogDescription: t('meta.description'),
})
</script>
