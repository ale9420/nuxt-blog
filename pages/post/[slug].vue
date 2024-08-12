<template>
  <article v-if="post" class="w-full">
    <div
      v-if="post?.featured_image && post?.primary_category?.data?.attributes"
      class="relative"
    >
      <PostCategory
        :category="post?.primary_category?.data?.attributes"
        class="absolute top-4 left-0 rounded-r-md"
        main
      />
      <StrapiBlocksTextImageNode
        :image="post.featured_image.data.attributes"
        class="sm:h-48 md:h-96 lg:h-[40rem] object-cover w-full"
      />
    </div>
    <div
      class="container mx-auto flex flex-col items-center bg-slate-50 dark:bg-slate-600 w-full sm:p-3"
    >
      <PostAuthor
        :author="post.author.data.attributes"
        :published-at="post.publishedAt"
      />
      <h1 class="sm:text-3xl lg:text-7xl dark:text-slate-50 mt-2">
        {{ post?.title }}
      </h1>
      <hr class="w-20 h-1 my-6 bg-slate-50 rounded-lg" />
      <div
        class="prose dark:prose-invert sm:prose-sm lg:prose-lg xl:prose-xl 2xl:prose-2xl prose-p:leading-normal prose-zinc prose-img:w-full w-full"
      >
        <StrapiBlocksText :nodes="post?.content" />
      </div>
      <hr class="w-20 h-1 my-6 bg-slate-50 rounded-lg" />
      <div class="flex justify-center flex-wrap mb-6">
        <PostCategory
          v-for="category in post?.categories.data || []"
          :key="category.id"
          :category="category?.attributes"
          :main="false"
          class="m-0.5"
        />
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
const route = useRoute()
const postStore = usePostStore()
const { postBySlug: post } = storeToRefs(postStore)
const seoTitle = post.value?.seo.metaTitle || post.value?.title || ''
const seoDescription = post.value?.seo.metaDescription

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
