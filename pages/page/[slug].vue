<template>
  <article class="mx-auto w-full">
    <div class="container mx-auto">
      <div class="flex flex-col items-center sm:my-6 lg:my-12">
        <h1 class="sm:text-3xl lg:text-7xl text-zinc-800 dark:text-slate-50">
          {{ page?.title }}
        </h1>
      </div>
      <StrapiBlocksTextImageNode
        :image="page.featured_image.data.attributes"
        class="sm:h-64 md:h-96 lg:h-[56rem] object-cover w-full rounded-lg"
      />
    </div>
    <div
      class="container mx-auto flex flex-col items-center my-12 dark:bg-slate-600 w-full sm:p-3"
    >
      <div
        class="prose dark:prose-invert sm:prose-sm lg:prose-lg xl:prose-xl 2xl:prose-2xl prose-p:leading-normal prose-zinc prose-img:w-full w-full"
      >
        <StrapiBlocksText :nodes="page?.content" />
      </div>
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
  title: () => page.value.seo.metaTitle,
  ogTitle: () => page.value.seo.metaTitle,
  description: () => page.value.seo.metaDescription,
  ogDescription: () => page.value.seo.metaDescription,
})

definePageMeta({
  layout: 'content',
})
</script>
