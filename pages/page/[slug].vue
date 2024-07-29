<template>
  <div>
    <h1>{{ page?.title }}</h1>
    <StrapiBlocks
      class="mt-2"
      :content="page?.content || []"
      :blocks="userBlocks"
    />
  </div>
</template>

<script lang="ts" setup>
import { StrapiBlocks } from 'vue-strapi-blocks-renderer'
import { userBlocks } from '@/helpers/strapi-blocks'
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
