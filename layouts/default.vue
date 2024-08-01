<template>
  <div class="bg-slate-200 flex flex-col min-h-screen">
    <LayoutMainHeader />
    <div
      class="container overflow-auto flex grow mx-auto z-0 sm:pt-5 sm:py-5 lg:pt-8 lg:p-5"
    >
      <slot />
    </div>
    <LayoutMainFooter />
  </div>
</template>

<script lang="ts" setup></script>
