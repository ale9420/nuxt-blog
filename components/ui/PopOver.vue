<template>
  <div v-click-outside="closePopover" class="relative">
    <slot name="trigger" :toggle="toggle" />
    <div
      v-if="isOpen"
      :id="id"
      ref="popover"
      role="tooltip"
      class="absolute inline-block top-10 inset-x-0 z-10 w-64 shadow-lg"
      data-popover
    >
      <slot />
      <div popover-arrow></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
type PopOverProps = {
  id: string
}

defineProps<PopOverProps>()

const popover = ref<HTMLElement>()
const isOpen = ref<boolean>(false)

const hide = () => (isOpen.value = false)
const show = () => (isOpen.value = true)

const toggle = () => {
  isOpen.value = !isOpen.value
}

const closePopover = () => {
  isOpen.value = false
}

defineExpose({
  hide,
  show,
})
</script>
