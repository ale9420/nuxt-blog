<template>
  <button
    class="text-slate-50 p-2 rounded-sm flex items-center justify-center"
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

const buttonClasses = {
  primary: [
    'bg-slate-600',
    'dark:bg-slate-700',
    'hover:bg-slate-500',
    'dark:hover:bg-slate-600',
  ],
  warning: ['bg-red-600', 'hover:bg-red-500'],
}

const backgroundClasses = computed(() =>
  props.disabled || props.isLoading
    ? ['disabled:bg-gray-400', 'disabled:text-slate-100']
    : buttonClasses[props.state || 'primary']
)
</script>
