<template>
  <NuxtImg
    provider="strapi"
    :src="url"
    :alt="props.image.alternativeText"
    :width="props.image.width"
    :height="props.image.height"
  />
</template>

<script lang="ts" setup>
import { screens } from '@/constants/screens'
import type { UploadFile } from '@/types'

const props = defineProps<{
  image: UploadFile
}>()

const url = ref(props.image.url)

onMounted(() => {
  switch (true) {
    case window?.innerWidth >= +screens.lg.slice(0, -2):
      url.value = props.image.formats.large.url
      break

    case window?.innerWidth >= +screens.md.slice(0, -2):
      url.value = props.image.formats.medium.url
      break

    case window?.innerWidth >= +screens.sm.slice(0, -2):
      url.value = props.image.formats.small.url
      break

    default:
      url.value = props.image.url
      break
  }
})
</script>
