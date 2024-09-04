import { defineStore } from 'pinia'
import type { Toast } from '@/types'

export const useToastStore = defineStore('useToastStore', () => {
  const toasts = ref<Toast[]>([])

  function addToast(toast: Toast) {
    const id = Date.now()
    toasts?.value.push({ ...toast, id })
    setTimeout(() => {
      toasts.value = toasts?.value?.filter((toast) => toast.id !== id)
    }, toast.timeout)
  }

  return { addToast, toasts }
})
