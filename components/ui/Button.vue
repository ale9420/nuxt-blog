<template>
  <button
    class="text-slate-50 p-2 rounded-md flex items-center justify-center"
    :class="backgroundClasses"
    :disabled="disabled"
  >
    <div v-if="isLoading" role="status">
      <UiSpinner />
      <span class="sr-only">Loading...</span>
    </div>
    <slot v-else />
  </button>
</template>
<script lang="ts" setup>
type ButtonProps = {
  disabled?: boolean
  isLoading?: boolean
  state?: 'primary' | 'warning'
}

const props = defineProps<ButtonProps>()

const backgroundClasses = computed(() =>
  props.disabled || props.isLoading
    ? ['disabled:bg-gray-400', 'disabled:text-slate-100']
    : [
        'bg-gradient-to-b',
        'from-teal-500',
        'to-emerald-500',
        'hover:to-teal-600',
      ]
)
</script>
