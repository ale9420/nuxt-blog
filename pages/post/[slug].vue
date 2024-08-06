<template>
  <article class="w-full">
    <StrapiBlocksTextImageNode
      :image="post?.featured_image?.data?.attributes"
      class="sm:h-64 md:h-96 lg:h-[40rem] w-full"
    />
    <div
      class="flex flex-col items-center bg-slate-50 dark:bg-slate-600 w-full sm:p-3"
    >
      <h1 class="sm:text-3xl lg:text-7xl dark:text-slate-50">
        {{ post?.title }}
      </h1>
      <div
        class="prose dark:prose-invert sm:prose-sm lg:prose-lg xl:prose-xl 2xl:prose-2xl prose-p:leading-normal prose-zinc prose-img:w-full w-full"
      >
        <StrapiBlocksText :nodes="post?.content" />
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
import postBySlug from '@/graphql/queries/post-by-slug.gql'
import type { PostEntityResponseCollection } from '~/types'

const graphql = useStrapiGraphQL()
const route = useRoute()
const { locale } = useLanguageStore()

const postQuery = await graphql<PostEntityResponseCollection>(postBySlug, {
  slug: route.params.slug,
  locale,
})

const post = computed(() => postQuery?.data?.posts?.data[0]?.attributes)
const seoTitle = post.value?.meta_title || post.value?.title || ''
const seoDescription = post.value?.meta_description

useSeoMeta({
  title: () => seoTitle,
  ogTitle: () => seoTitle,
  description: () => seoDescription,
  ogDescription: () => seoDescription,
})
</script>
