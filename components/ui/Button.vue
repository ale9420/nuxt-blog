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
    ? ['disabled:bg-gray-400', 'disabled:text-slate-100']
    : ['bg-gradient-to-r', 'from-teal-500', 'to-cyan-600']
)
</script>
