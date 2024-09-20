<template>
  <div class="fixed top-2 left-1 z-20">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :class="{
        'bg-red-200 border-red-200': toast.status === 'error',
        'bg-orange-200 border-orange-200': toast.status === 'warning',
        'bg-teal-200 border-teal-200': toast.status === 'success',
      }"
      class="border rounded-lg text-neutral-800 p-2 mb-1"
    >
      <h5 class="text-xl font-semibold">{{ toast.title }}</h5>
      <p class="font-normal">{{ toast?.description }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const toastStore = useToastStore()
const { toasts } = storeToRefs(toastStore)
</script>
