<template>
  <section
    class="bg-neutral-100 shadow-md rounded-md overflow-hidden hover:shadow-lg max-w-md"
  >
    <div class="relative">
      <NuxtImg
        :src="post.featured_image.data.attributes.url"
        :alt="post.featured_image.data.attributes.alternativeText"
        provider="strapi"
        class="sm:h-40 lg:h-60 w-full"
      />
      <span
        v-if="post.primary_category"
        class="absolute right-0 top-4 bg-gradient-to-r from-red-500 to-red-700 text-slate-100 rounded-l-lg p-1"
        >{{ post.primary_category.data.attributes.name }}</span
      >
    </div>
    <div class="sm:p-2 lg:p-5">
      <h3 class="sm:text-lg md:text-2xl font-bold">{{ post.title }}</h3>
      <div
        class="prose sm:prose-sm lg:prose-lg xl:prose-xl 2xl:prose-2xl prose-zinc mt-2 min-h-20"
      >
        <StrapiBlocks :content="post.excerpt" :blocks="userBlocks" />
      </div>
      <div class="overflow-x-auto whitespace-nowrap sm:w-1/2 sm:mt-0 lg:mt-5">
        <div class="inline-flex">
          <span
            v-for="tag in post.categories.data"
            :key="tag.id"
            class="sm:text-xs bg-yellow-400 rounded-md mr-1 py-1 sm:px-1 md:px-2"
            >{{ tag.attributes.name }}</span
          >
        </div>
      </div>
      <div class="flex items-center justify-between mt-2">
        <div class="flex items-center">
          <NuxtImg
            :src="post.author.data.attributes.profile_image.data.attributes.url"
            :alt="post.author.data.attributes.name"
            provider="strapi"
            class="rounded-full sm:h-6 sm:w-6 md:h-10 md:w-10"
          />
          <div class="sm:text-xs sm:ml-1 md:ml-2">
            <p>{{ post?.author?.data?.attributes?.name }}</p>
            <span>{{ postDate }}</span>
          </div>
        </div>

        <NuxtLink
          class="border border-sky-500 text-sky-500 p-1 sm:text-xs rounded-lg"
          :to="{ name: 'post-slug', params: { slug: post.slug } }"
        >
          Ver detalle
        </NuxtLink>
      </div>
    </div>
  </section>
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
