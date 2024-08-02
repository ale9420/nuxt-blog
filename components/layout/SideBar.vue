<template>
  <div
    class="absolute top-0 left-0 bg-red-600 h-screen overscroll-none sm:w-3/5 md:w-1/2 z-50 p-5"
    :class="{ hidden: !open }"
  >
    <div class="flex justify-between">
      <h3 class="text-slate-50 text-xl">BOG.DEV</h3>
      <XCircleIcon
        @click="$emit('close')"
        class="size-6 text-neutral-50 cursor-pointer"
      />
    </div>
    <hr class="w-full" />
    <LayoutMenuNavigation
      class="text-slate-50 flex flex-col mt-3"
      @click="$emit('close')"
      :pages="pages"
    />
  </div>
</template>

<script lang="ts" setup>
import { XCircleIcon } from '@heroicons/vue/20/solid'

type SideBarProps = {
  open: boolean
}

const { pages } = await usePages()

const props = defineProps<SideBarProps>()
</script>

<style></style>
