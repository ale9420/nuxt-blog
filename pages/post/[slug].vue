<template>
  <article class="flex flex-col bg-slate-50 w-full">
    <NuxtImg
      :src="post?.featured_image?.data?.attributes?.url"
      :alt="post?.featured_image?.data?.attributes?.alternativeText"
      provider="strapi"
      class="sm:h-64 lg:h-[40rem] w-full"
    />
    <h1 class="sm:text-3xl lg:text-7xl">{{ post?.title }}</h1>
    <div class="prose prose-zinc w-full">
      <StrapiBlocks
        class="mt-2"
        :content="post?.content || []"
        :blocks="userBlocks"
      />
    </div>
  </article>
</template>

<script lang="ts" setup>
import { StrapiBlocks } from 'vue-strapi-blocks-renderer'
import { userBlocks } from '@/helpers/strapi-blocks'
import postBySlug from '@/graphql/queries/post-by-slug.gql'
import type { PostEntityResponseCollection } from '~/types'

const graphql = useStrapiGraphQL()
const route = useRoute()

const postQuery = await graphql<PostEntityResponseCollection>(postBySlug, {
  slug: route.params.slug,
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

<style>
.featured-image {
  height: 628px;
}
</style>
