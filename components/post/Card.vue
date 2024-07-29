<template>
  <NuxtLink :to="{ name: 'post-slug', params: { slug: post.slug } }">
    <section
      class="bg-neutral-100 shadow-md rounded-md overflow-hidden hover:shadow-lg hover:cursor-pointer"
    >
      <div class="relative">
        <NuxtImg
          :src="post.featured_image.data.attributes.url"
          :alt="post.featured_image.data.attributes.alternativeText"
          provider="strapi"
          class="h-60 w-full"
        />

        <span
          v-if="post.primary_category"
          class="absolute right-0 top-4 bg-gradient-to-r from-red-500 to-red-700 text-slate-100 rounded-l-lg p-1"
          >{{ post.primary_category.data.attributes.name }}</span
        >
      </div>
      <div class="p-5">
        <h3 class="text-2xl font-bold">{{ post.title }}</h3>
        <div class="min-h-24">
          <StrapiBlocks
            class="mt-2 line-clamp-3"
            :content="post.excerpt"
            :blocks="userBlocks"
          />
        </div>
        <div class="flex items-end mt-5 min-h-10">
          <span
            v-for="tag in post.categories.data"
            :key="tag.id"
            class="bg-yellow-400 rounded-md mr-1 py-1 px-2"
            >{{ tag.attributes.name }}</span
          >
        </div>
        <div class="flex items-center mt-2">
          <NuxtImg
            :src="post.author.data.attributes.profile_image.data.attributes.url"
            :alt="post.author.data.attributes.name"
            provider="strapi"
            class="rounded-full h-10 w-10"
          />
          <div class="ml-2">
            <p>{{ post?.author?.data?.attributes?.name || 'adasd' }}</p>
            <span>{{ postDate }}</span>
          </div>
        </div>
      </div>
    </section>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { DateTime } from 'luxon'
import { StrapiBlocks } from 'vue-strapi-blocks-renderer'
import { userBlocks } from '@/helpers/strapi-blocks'
import type { Post } from '~/types'

type PostProps = {
  post: Post
}

const props = defineProps<PostProps>()
const postDate = computed(() =>
  DateTime.fromISO(props.post.publishedAt as string).toLocaleString(
    DateTime.DATE_FULL
  )
)
</script>
