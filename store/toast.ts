import { defineStore } from 'pinia'
import type { Toast } from '@/types'

export const useToastStore = defineStore('useToastStore', () => {
  const toasts = ref<Toast[]>()

  const addToast = (toast: Toast) => {
    toasts.value?.push(toast)
  }

  return { addToast, toasts }
})
