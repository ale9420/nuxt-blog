<template>
  <div class="flex justify-center gap-3">
    <UiButton :disabled="internalCurrentPage <= 1" @click="previousPage">
      <ChevronLeftIcon class="size-6" />
    </UiButton>
    <UiLink
      v-for="index in indexButtons"
      :key="index"
      :active="index === internalCurrentPage"
      @click="indexPage(index)"
      >{{ index }}</UiLink
    >
    <UiButton :disabled="internalCurrentPage >= pageCount" @click="nextPage">
      <ChevronRightIcon class="size-6" />
    </UiButton>
  </div>
</template>

<script lang="ts" setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
import type { PaginationProps } from '@/types'

const emit = defineEmits(['pageChange'])
const props = defineProps<PaginationProps>()
const internalCurrentPage = ref(props.page)

const indexButtons = computed(() => {
  const startPage = Math.max(1, props.page - 2)
  const endPage = Math.min(props.pageCount, startPage + 4)

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  )
})

const indexPage = (index: number) => {
  internalCurrentPage.value = index
  emit('pageChange', internalCurrentPage.value)
}

const previousPage = () => {
  internalCurrentPage.value -= 1
  emit('pageChange', internalCurrentPage.value)
}

const nextPage = () => {
  internalCurrentPage.value += 1
  emit('pageChange', internalCurrentPage.value)
}
</script>
