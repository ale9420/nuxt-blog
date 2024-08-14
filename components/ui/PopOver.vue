<template>
  <div
    v-if="isVisible"
    :data-popover-id="id"
    role="tooltip"
    class="absolute z-10 inline-block transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:border-gray-600 dark:bg-gray-800"
  >
    <slot />
    <div data-popper-arrow></div>
  </div>
</template>

<script lang="ts" setup>
type PopOverProps = {
  isVisible: boolean
  id: string
}

defineProps<PopOverProps>()
</script>
