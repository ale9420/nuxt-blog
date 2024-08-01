<template>
  <div class="bg-slate-200 flex flex-col min-h-screen">
    <LayoutMainHeader />

    <div
      class="container overflow-y-auto overflow-x-hidden flex grow mx-auto z-0 sm:py-3 lg:pt-8 lg:p-5"
    >
      <slot />
    </div>
    <LayoutMainFooter />
  </div>
</template>

<script lang="ts" setup></script>
