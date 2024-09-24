<template>
  <Carousel :breakpoints="breakpoints" :autoplay="9000">
    <Slide
      v-for="post in featuredPosts?.data.posts.data"
      :key="post.id"
      class="relative"
    >
      <StrapiBlocksTextImageNode
        :image="post.attributes.featured_image.data.attributes"
        class="sm:h-80 md:h-[32rem] 2xl:h-[46rem] w-full object-cover"
      />

      <div class="absolute inset-x-0 sm:bottom-4 lg:bottom-6 text-stone-50">
        <UiLink
          :to="{
            name: 'post-slug',
            params: { slug: post.attributes.slug },
            query: { locale: encodeURI(post.attributes.locale) },
          }"
          class="block font-bold sm:text-xl md:text-2xl lg:text-4xl"
          :hover-color="false"
          @click="navigateToPost(post.attributes, post.id)"
        >
          {{ post.attributes.title }}
        </UiLink>
        <span
          class="sm:text-sm uppercase hover:underline hover:underline-offset-4 hover:cursor-pointer"
        >
          {{ post.attributes.primary_category.data.attributes.name }}
        </span>
      </div>
    </Slide>
  </Carousel>
</template>

<script lang="ts" setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import type { Post } from '@/types'

const breakpoints = {
  600: {
    itemsToShow: 1,
  },
  1500: {
    itemsToShow: 2,
  },
}

const postStore = usePostStore()
const { featuredPosts } = storeToRefs(postStore)

const navigateToPost = (post: Post, id: string) => {
  postStore.updatePost({ ...post, id })
}

onServerPrefetch(async () => {
  await postStore.fetchFeaturedPosts()
})

onMounted(async () => {
  if (!featuredPosts.value) {
    await postStore.fetchFeaturedPosts()
  }
})
</script>
