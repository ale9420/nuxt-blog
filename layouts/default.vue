<template>
  <div class="flex flex-col">
    <LayoutMainHeader />
    <div
      class="flex container relative mx-auto z-0 min-h-80 sm:top-14 lg:top-20 sm:py-3 lg:p-5 lg:inset-x-0"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup></script>
