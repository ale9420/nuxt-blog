<template>
  <span class="text-xs font-semibold py-0.5 px-2" :class="isMainCategory">{{
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
    ? ['bg-red-600/75', 'text-slate-50', 'uppercase']
    : ['border-2', 'border-amber-500', 'rounded-md', 'text-amber-500']
)
</script>

<style></style>
