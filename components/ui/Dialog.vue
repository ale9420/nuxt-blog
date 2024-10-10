<template>
  <dialog
    ref="dialog"
    :class="dialogSize"
    class="ui-dialog fixed z-10 shadow-lg rounded-lg overflow-visible light:bg-slate-50 dark:bg-slate-600"
  >
    <div class="relative sm:p-5 md:p-10">
      <button
        class="absolute top-2 right-2 light:text-slate-900 dark:text-neutral-200 hover:text-slate-500"
        @click="hide"
      >
        <XMarkIcon class="size-8" />
      </button>
      <div
        v-if="showIcon"
        class="bg-slate-200 h-28 w-28 rounded-full flex items-center justify-center shadow-lg absolute inset-x-0 m-auto -top-14"
      >
        <div
          class="bg-gradient-to-r from-slate-600 to-cyan-600 h-22 w-22 rounded-full flex items-center justify-center p-5"
        >
          <slot name="icon" />
        </div>
      </div>
      <p v-if="title" class="text-2xl mb-4">{{ title }}</p>
      <div :class="{ 'mt-6': showIcon }">
        <slot />
      </div>
      <div class="flex justify-end gap-2 mt-4">
        <slot name="actions" />
      </div>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
import { XMarkIcon } from '@heroicons/vue/20/solid'

type PopOverProps = {
  showIcon?: boolean
  size?: 'small' | 'medium' | 'large'
  title?: string
}

const props = defineProps<PopOverProps>()

const dialog = ref<HTMLDialogElement>()
const isOpen = ref<boolean>(false)

const dialogSize = computed(() => {
  let _size = 'sm:w-full md:w-96'
  switch (props.size) {
    case 'medium':
      _size = 'md:w-3/5 lg:w-2/5'
      break
    case 'large':
      _size = 'md:w-3/4 '
      break
    default:
      _size = 'md:w-96'
      break
  }

  return _size
})

const hide = () => {
  isOpen.value = false
  if (dialog.value) {
    dialog.value.close()
    document.body.classList.remove('overflow-hidden')
  }
}

const show = () => {
  isOpen.value = true
  if (dialog.value) {
    dialog.value.showModal()
    document.body.classList.add('overflow-hidden')
  }
}

onBeforeUnmount(() => {
  hide()
})

defineExpose({
  hide,
  show,
})
</script>

<style>
.ui-dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.363);
}
</style>
