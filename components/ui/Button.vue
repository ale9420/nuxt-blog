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

const buttonClasses = {
  primary: [
    'bg-gradient-to-b',
    'from-sky-500',
    'to-sky-700',
    'hover:to-cyan-800',
  ],
  warning: [
    'bg-gradient-to-b',
    'from-red-500',
    'to-red-700',
    'hover:to-orange-800',
  ],
}

const backgroundClasses = computed(() =>
  props.disabled || props.isLoading
    ? ['disabled:bg-gray-400', 'disabled:text-slate-100']
    : buttonClasses[props.state || 'primary']
)
</script>
