<template>
  <article v-if="post" class="mx-auto w-full">
    <div class="container mx-auto">
      <!-- Categories and Post metadata (Title, Author, Date, ReadTime) -->
      <div class="flex flex-col items-center sm:my-6 lg:my-12">
        <div class="flex flex-wrap justify-center">
          <PostCategory
            v-for="category in post?.categories.data || []"
            :key="category.id"
            :category="category?.attributes"
            :main="false"
            class="my-0.5 mx-1"
          />
        </div>
        <h1
          class="sm:text-3xl lg:text-7xl text-zinc-800 dark:text-slate-50 mt-2"
        >
          {{ post?.title }}
        </h1>
        <div
          class="flex items-center text-base text-zinc-600 mt-4 sm:text-[0.65rem] md:text-base"
        >
          <PostAuthor
            :author="post.author.data.attributes"
            :published-at="post.publishedAt"
          />
          <hr class="h-4 sm:mx-2 md:mx-4 border border-l-zinc-600" />
          <span>{{ postDate }}</span>
          <hr class="h-4 sm:mx-2 md:mx-4 border border-l-zinc-600" />
          <PostReadTime :read-time="post.readTime" />
        </div>
      </div>
      <!-- Featured image and primary category -->
      <div
        v-if="post?.featured_image && post?.primary_category?.data?.attributes"
        class="flex justify-center"
      >
        <div class="relative w-11/12 xl:w-full">
          <PostCategory
            :category="post?.primary_category?.data?.attributes"
            class="absolute top-10 left-0 rounded-r-md"
            main
          />
          <StrapiBlocksTextImageNode
            :image="post.featured_image.data.attributes"
            class="sm:h-64 md:h-96 lg:h-[45rem] object-cover w-full rounded-lg"
          />
        </div>
      </div>
    </div>
    <!-- Post Content -->
    <div
      class="container mx-auto flex flex-col items-center my-12 dark:bg-slate-600 w-full sm:p-3"
    >
      <div
        class="prose dark:prose-invert sm:prose-sm lg:prose-lg xl:prose-xl 2xl:prose-2xl prose-p:leading-normal prose-zinc prose-img:w-full w-full"
      >
        <StrapiBlocksText :nodes="post?.content" />
      </div>
    </div>
    <ClientOnly>
      <CommentList />
    </ClientOnly>
  </article>
</template>

<script lang="ts" setup>
import { DateTime } from 'luxon'

const route = useRoute()
const postStore = usePostStore()
const languageStore = useLanguageStore()
const { postBySlug: post } = storeToRefs(postStore)
const { locale } = storeToRefs(languageStore)
const seoTitle = post.value?.seo.metaTitle || post.value?.title || ''
const seoDescription = post.value?.seo.metaDescription

const postDate = computed(() =>
  DateTime.fromISO(post.value?.publishedAt as string, {
    locale: route.query.locale?.toString() || locale.value,
  }).toLocaleString(DateTime.DATE_FULL)
)

onServerPrefetch(async () => {
  if (!post.value)
    await postStore.fetchPostBySlug(
      route.params.slug as string,
      route.query.locale as string
    )
})

useSeoMeta({
  title: () => seoTitle,
  ogTitle: () => seoTitle,
  description: () => seoDescription,
  ogDescription: () => seoDescription,
  ogImage: () => post.value?.featured_image.data.attributes.url,
})

definePageMeta({
  layout: 'content',
})
</script>
