<template>
  <button
    class="text-slate-50 p-2 rounded-md"
    :class="backgroundClasses"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
<script lang="ts" setup>
type ButtonProps = {
  disabled?: boolean
}

const props = defineProps<ButtonProps>()

const backgroundClasses = computed(() =>
  props.disabled
    ? ['disabled:bg-gray-200']
    : ['bg-gradient-to-r', 'from-red-500', 'to-red-700']
)
</script>
