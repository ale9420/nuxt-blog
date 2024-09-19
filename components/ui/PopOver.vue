<template>
  <dialog
    :id="id"
    ref="popover"
    role="tooltip"
    class="ui-popover z-10 w-64 shadow-lg"
    popover
  >
    <div class="rounded-lg overflow-hidden">
      <slot />
    </div>
  </dialog>
</template>

<script lang="ts" setup>
type PopOverProps = {
  id: string
}

defineProps<PopOverProps>()

const popover = ref<HTMLDialogElement>()
const isOpen = ref<boolean>(false)

const hide = () => {
  isOpen.value = false

  if (popover.value) {
    popover.value.close()
  }
}
const show = () => {
  isOpen.value = true
  if (popover.value) {
    popover.value.showModal()
  }
}

defineExpose({
  hide,
  show,
})
</script>
