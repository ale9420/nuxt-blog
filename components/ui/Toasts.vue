<template>
  <div class="fixed top-2 left-1 z-10">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :class="{
        'bg-red-600 border-red-200': toast.status === 'error',
        'bg-orange-600 border-orange-200': toast.status === 'warning',
        'bg-teal-600 border-teal-200': toast.status === 'success',
      }"
      class="border rounded-md text-neutral-50 p-2 my-1"
    >
      <h5 class="text-lg font-semibold">{{ toast.title }}</h5>
      <p class="font-normal">{{ toast?.description }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const toastStore = useToastStore()
const { toasts } = storeToRefs(toastStore)
</script>
