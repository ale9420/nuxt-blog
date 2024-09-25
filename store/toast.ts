import { defineStore } from 'pinia'
import type { Toast } from '@/types'

export const useToastStore = defineStore('useToastStore', () => {
  const toasts = ref<Toast[]>([])
  const { t } = useI18n({ useScope: 'global' })

  function addToast(toast: Toast) {
    const id = Date.now()
    toasts?.value.push({ ...toast, id })
    setTimeout(() => {
      toasts.value = toasts?.value?.filter((toast) => toast.id !== id)
    }, toast.timeout)
  }

  function addRequestErrorToast() {
    addToast({
      title: 'Error',
      description: t('global.requestError'),
      timeout: 2000,
      status: 'error',
    })
  }

  return { addToast, addRequestErrorToast, toasts }
})
