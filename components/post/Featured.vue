<template>
  <Carousel :autoplay="9000" :items-to-show="1" wrap-around>
    <Slide
      v-for="post in featuredPosts?.data.posts.data"
      :key="post.id"
      class="relative"
    >
      <StrapiBlocksTextImageNode
        :image="post.attributes.featured_image.data.attributes"
        class="sm:h-80 md:h-[32rem] lg:h-[35rem] lg:w-full xl:h-[42rem] 2xl:h[56rem] object-cover"
      />

      <div class="absolute inset-x-0 sm:bottom-4 lg:bottom-6 text-stone-50">
        <h3
          class="font-bold sm:text-xl md:text-2xl lg:text-4xl hover:underline hover:underline-offset-4 hover:cursor-pointer"
        >
          {{ post.attributes.title }}
        </h3>
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

const postStore = usePostStore()
const { featuredPosts } = storeToRefs(postStore)

onServerPrefetch(async () => {
  await postStore.fetchFeaturedPosts()
})
</script>
