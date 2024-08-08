<template>
  <div class="text-zinc-200 flex flex-col items-center">
    <NuxtImg
      :src="author.profile_image?.data?.attributes?.formats.thumbnail.url"
      :alt="author.name"
      provider="strapi"
      class="rounded-full sm:h-8 sm:w-8 md:h-10 md:w-10"
    />
    <div class="flex flex-col items-center leading-none">
      <p class="font-bold">{{ author?.name }}</p>
      <span class="text-xs">{{ postDate }} - {{ readTimeText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon'
import type { Author } from '@/types'

type AuthorProps = {
  author: Author
  publishedAt: string
  readTime: number
}

const props = defineProps<AuthorProps>()
const { t } = useI18n()
const languageStore = useLanguageStore()
const { locale } = storeToRefs(languageStore)

const postDate = computed(() =>
  DateTime.fromISO(props.publishedAt as string)
    .setLocale(locale.value)
    .toLocaleString(DateTime.DATE_FULL)
)
const readTimeText = computed(() => {
  const timeProps = { minutes: props.readTime }
  return props.readTime > 1
    ? t('global.minutes', timeProps)
    : t('global.minute', timeProps)
})
</script>
