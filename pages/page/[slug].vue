<template>
  <article
    class="flex flex-col items-center w-full bg-slate-50 dark:bg-slate-600 sm:p-3"
  >
    <h1 class="sm:text-3xl lg:text-7xl dark:text-slate-50">
      {{ page?.title }}
    </h1>
    <div
      class="prose dark:prose-invert sm:prose-sm lg:prose-lg xl:prose-xl 2xl:prose-2xl prose-p:leading-normal prose-zinc prose-img:w-full w-full"
    >
      <StrapiBlocksText :nodes="page?.content" />
    </div>
  </article>
</template>

<script lang="ts" setup>
import type { PageEntityResponseCollection } from '@/types'
import pageBySlug from '@/graphql/queries/page-by-slug.gql'

const route = useRoute()
const graphql = useStrapiGraphQL()
const result = await graphql<PageEntityResponseCollection>(pageBySlug, {
  slug: route.params.slug,
})

const page = computed(() => result?.data?.pages?.data[0]?.attributes)

console.log(page)

useSeoMeta({
  title: () => page.value.seo.metaTitle,
  ogTitle: () => page.value.seo.metaTitle,
  description: () => page.value.seo.metaDescription,
  ogDescription: () => page.value.seo.metaDescription,
})
</script>
