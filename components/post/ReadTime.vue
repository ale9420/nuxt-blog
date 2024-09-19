<template>
  <div class="flex items-center">
    <BookOpenIcon class="size-5" />
    <span class="ml-1">{{ readTimeText }}</span>
  </div>
</template>

<script lang="ts" setup>
import { BookOpenIcon } from '@heroicons/vue/16/solid'

type ReadTimeProps = {
  readTime: number
}

const { t } = useI18n()

const props = defineProps<ReadTimeProps>()

const readTimeText = computed(() => {
  const timeProps = { minutes: props.readTime }
  return props.readTime > 1
    ? t('global.minutes', timeProps)
    : t('global.minute', timeProps)
})
</script>
