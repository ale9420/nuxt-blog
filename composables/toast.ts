import type { Toast } from '@/types'

export const useToast = () => {
  const toasts = reactive<Toast[]>([])

  const showToast = (toast: Toast) => {
    const id = Date.now()
    toasts.push({ ...toast, id })

    // setTimeout(() => {
    //   toasts = toasts.filter((toast) => toast.id !== id)
    // }, toast.timeout)
  }

  watch(toasts, (newValue) => {
    console.log(newValue.length)
  })

  return {
    toasts,
    showToast,
  }
}
