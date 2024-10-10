<template>
  <div class="bg-stone-100 dark:bg-slate-600 flex flex-col min-h-screen">
    <Transition>
      <LayoutMainHeader v-show="showHeader" />
    </Transition>

    <div class="overflow-y-auto flex grow">
      <slot />
    </div>
    <LayoutMainFooter />
  </div>
</template>

<script lang="ts" setup>
const { showHeader } = useScroll()
</script>
