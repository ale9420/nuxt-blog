<template>
  <section class="bg-neutral-100 shadow-md rounded-md hover:shadow-lg">
    <div class="relative">
      <StrapiBlocksTextImageNode
        :image="post?.featured_image?.data?.attributes"
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
        class="prose prose-zinc prose-p:leading-normal sm:prose-sm lg:prose-lg xl:prose-xl 2xl:prose-2xl mt-2 min-h-20 overflow-hidden"
      >
        <StrapiBlocksText :nodes="post?.excerpt" />
      </div>
      <div
        v-if="categoriesWidth.size > 0"
        ref="categoriesContainer"
        class="overflow-x-auto sm:mt-0 lg:mt-5 py-2"
        :class="categoriesWidth.class"
      >
        <span
          v-for="tag in post.categories.data"
          :key="tag.id"
          class="sm:text-xs bg-yellow-400 rounded-md mr-1 py-1 sm:px-1 md:px-2"
          >{{ tag.attributes.name }}</span
        >
      </div>
      <div class="flex items-end justify-between mt-2">
        <div class="flex items-center">
          <NuxtImg
            :src="
              post.author.data.attributes.profile_image?.data?.attributes
                ?.formats.thumbnail.url
            "
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
          class="uppercase font-bold text-sky-500 p-1 sm:text-xs rounded-lg hover:text-sky-600 hover:underline"
          :to="{ name: 'post-slug', params: { slug: post.slug } }"
        >
          {{ $t('global.details') }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { DateTime } from 'luxon'
import type { Post } from '~/types'

type PostProps = {
  post: Post
}

const props = defineProps<PostProps>()
const categoriesContainer = ref<Element>()
const categoriesWidth = ref({ size: 0, class: '' })
const postDate = computed(() =>
  DateTime.fromISO(props.post.publishedAt as string).toLocaleString(
    DateTime.DATE_FULL
  )
)

onMounted(() => {
  const containerSize = categoriesContainer?.value?.clientWidth || 0
  categoriesWidth.value.class = `w-[${Math.round(containerSize / 16) - 1}rem]`
  categoriesWidth.value.size = containerSize
})
</script>
