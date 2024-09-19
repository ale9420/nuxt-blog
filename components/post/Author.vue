<template>
  <div class="flex items-center">
    <div class="flex items-center">
      <NuxtImg
        :src="author.profile_image?.data?.attributes?.formats.thumbnail.url"
        :alt="author.name"
        provider="strapi"
        class="rounded-full sm:h-5 sm:w-5 md:h-6 md:w-6 lg:w-7 lg:h-7"
      />
      <i18n-t keypath="post.author" tag="p" class="ml-1 lg:ml-2" for="author">
        <template #author>
          <span>
            {{ author?.name }}
          </span>
        </template>
      </i18n-t>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Author } from '@/types'

type AuthorProps = {
  author: Author
}

defineProps<AuthorProps>()
</script>
