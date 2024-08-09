<template>
  <section
    class="bg-neutral-100 dark:bg-slate-700 dark:text-slate-50 shadow-md hover:shadow-lg flex p-2 rounded-lg w-full"
    @click="navigateToPost"
  >
    <div class="relative">
      <span
        v-if="post.primary_category"
        class="absolute top-2 left-0 bg-red-600/50 text-xs text-slate-50 font-semibold uppercase rounded-r-lg p-1"
        >{{ post.primary_category.data.attributes.name }}</span
      >

      <StrapiBlocksTextImageNode
        :image="post?.featured_image?.data?.attributes"
        class="w-36 rounded-md object-cover"
      />
    </div>

    <div class="pl-2 flex flex-col justify-between grow">
      <h3>
        {{ post.title }}
      </h3>
      <div
        class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-300 font-semibold"
      >
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
          <p class="ml-1">{{ post?.author?.data?.attributes?.name }}</p>
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
const languageStore = useLanguageStore()
const { locale } = storeToRefs(languageStore)
const props = defineProps<PostProps>()
const postDate = computed(() =>
  DateTime.fromISO(props.post.publishedAt as string)
    .setLocale(locale.value)
    .toLocaleString(DateTime.DATE_FULL)
)

const navigateToPost = () => {
  updatePost(props.post)
}
</script>
