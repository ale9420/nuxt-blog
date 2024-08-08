<template>
  <span class="text-xs font-semibold p-0.5" :class="isMainCategory">{{
    category.name
  }}</span>
</template>

<script lang="ts" setup>
import type { Category } from '@/types'

type CategoryProps = {
  category: Category
  main: boolean
}

const props = defineProps<CategoryProps>()

const isMainCategory = computed(() =>
  props.main
    ? [
        'absolute',
        'top-2',
        'left-0',
        'bg-red-600/75',
        'text-slate-50',
        'rounded-r-md',
        'uppercase',
      ]
    : ['border-2', 'border-amber-500', 'rounded-md', 'text-amber-500']
)
</script>

<style></style>
