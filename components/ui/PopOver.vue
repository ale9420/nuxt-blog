<template>
  <div class="relative">
    <slot name="trigger" />
    <div
      :id="id"
      ref="popover"
      role="tooltip"
      class="absolute bottom-10 w-64"
      popover
    >
      <slot />
      <div data-popper-arrow></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
type PopOverProps = {
  isVisible: boolean
  id: string
}

defineProps<PopOverProps>()

const popover = ref<HTMLElement>()

const hide = () => popover.value?.hidePopover()
const show = () => popover.value?.showPopover()

defineExpose({
  hide,
  show,
})
</script>
