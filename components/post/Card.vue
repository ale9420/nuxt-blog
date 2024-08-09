<template>
  <section
    class="bg-neutral-100 dark:bg-slate-700 dark:text-slate-50 shadow-md rounded-md hover:shadow-lg"
    @click="navigateToPost"
  >
    <StrapiBlocksTextImageNode
      :image="post?.featured_image?.data?.attributes"
      class="sm:h-40 object-cover w-full"
    />
    <div class="sm:p-2 lg:p-3">
      <span
        v-if="post.primary_category"
        class="bg-red-200 text-sm text-red-700 font-bold uppercase rounded-lg py-0.5 px-1.5"
        >{{ post.primary_category.data.attributes.name }}</span
      >
      <h3 class="sm:text-lg md:text-2xl font-bold">
        {{ post.title }}
      </h3>
      <div
        class="prose prose-zinc prose-p:leading-normal dark:prose-invert lg:prose-sm mt-2 min-h-20 overflow-hidden"
      >
        <StrapiBlocksText :nodes="post?.excerpt" />
      </div>
      <hr class="w-full h-px mb-2 bg-slate-200 border-0 dark:bg-slate-500" />
      <div class="flex items-center justify-between text-xs lg:text-base">
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
          <div class="sm:ml-1 md:ml-2">
            <p>{{ post?.author?.data?.attributes?.name }}</p>
          </div>
        </div>
        <span>{{ postDate }}</span>
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

const { updatePost } = usePostStore()
const props = defineProps<PostProps>()
const postDate = computed(() =>
  DateTime.fromISO(props.post.publishedAt as string).toLocaleString(
    DateTime.DATE_FULL
  )
)

const navigateToPost = () => {
  updatePost(props.post)
}
</script>
