<template>
  <div>
    <Carousel :autoplay="9000" :items-to-show="1" wrap-around>
      <Slide v-for="post in featuredPosts?.data.posts.data" :key="post.id">
        <div class="relative mx-1">
          <StrapiBlocksTextImageNode
            :image="post.attributes.featured_image.data.attributes"
            class="sm:w-72 sm:w-full md:h-64 lg:h-[56rem] object-cover rounded-lg"
          />
          <h3 class="absolute left-4 bottom-16 text-stone-50 text-3xl">
            {{ post.attributes.title }}
          </h3>
          <UiButton class="absolute left-4 bottom-4">Ver mas</UiButton>
        </div>
      </Slide>
    </Carousel>
  </div>
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
