<template>
  <div class="flex items-center text-neutral-600 dark:text-neutral-300">
    <BookOpenIcon class="size-5" />
    <span class="text-xs lg:text-lg ml-1">{{ readTimeText }}</span>
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
