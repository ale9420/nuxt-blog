<template>
  <div
    class="text-neutral-600 dark:text-slate-200 flex items-center sm:text-xs md:text-md lg:text-lg"
  >
    <div class="flex items-center">
      <NuxtImg
        :src="author.profile_image?.data?.attributes?.formats.thumbnail.url"
        :alt="author.name"
        provider="strapi"
        class="rounded-full sm:h-5 sm:w-5 md:h-6 md:w-6 lg:w-7 lg:h-7"
      />
      <i18n-t
        keypath="post.author"
        tag="span"
        class="font-semibold ml-1 lg:ml-2"
        for="author"
      >
        <template #author>
          <NuxtLink to="/author" class="text-red-800 dark:text-red-400">
            {{ author?.name }}
          </NuxtLink>
        </template>
      </i18n-t>
    </div>
    <span
      class="mx-1 h-1.5 w-1.5 rounded-lg bg-red-800 dark:bg-red-400 lg:mx-2"
    ></span>
    <span> {{ postDate }}</span>
  </div>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon'
import type { Author } from '@/types'

type AuthorProps = {
  author: Author
  publishedAt: string
}

const props = defineProps<AuthorProps>()

const postDate = computed(() =>
  DateTime.fromISO(props.publishedAt as string).toLocaleString(
    DateTime.DATE_FULL
  )
)
</script>
