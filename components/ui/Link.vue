<template>
  <NuxtLink
    :class="{
      underline: active,
      'underline-offset-4': active,
      'text-red-600': active && hoverColor,
      'hover:text-red-600': hoverColor,
    }"
    class="text-inherit p-2 hover:underline hover:underline-offset-4 hover:cursor-pointer"
  >
    <slot
  /></NuxtLink>
</template>

<script lang="ts" setup>
const { hoverColor } = defineProps({
  active: {
    type: Boolean,
  },
  hoverColor: {
    type: Boolean,
    default: true,
  },
})
</script>
