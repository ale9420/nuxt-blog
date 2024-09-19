<template>
  <span class="py-0.5 px-2" :class="isMainCategory">{{ category.name }}</span>
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
    ? ['bg-red-600/75', 'text-slate-50', 'uppercase', 'font-bold', 'text-sm']
    : [
        'border-2',
        'border-red-600',
        'rounded-md',
        'text-red-600',
        'font-semibold',
        'text-xs',
      ]
)
</script>

<style></style>
