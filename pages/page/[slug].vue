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

useSeoMeta({
  title: () => page.value.meta.meta_title,
  ogTitle: () => page.value.meta.meta_title,
  description: () => page.value.meta.meta_description,
  ogDescription: () => page.value.meta.meta_description,
})
</script>
