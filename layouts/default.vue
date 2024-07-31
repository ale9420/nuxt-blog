<template>
  <div class="flex flex-col min-h-screen">
    <LayoutMainHeader />
    <div
      class="overflow-auto flex grow container mx-auto z-0 sm:pt-5 lg:pt-8 sm:py-3 lg:p-5 lg:inset-x-0"
    >
      <slot />
    </div>
    <LayoutMainFooter />
  </div>
</template>

<script lang="ts" setup></script>
