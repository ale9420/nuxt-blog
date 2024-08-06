<template>
  <div class="bg-slate-200 dark:bg-gray-800 flex flex-col min-h-screen">
    <LayoutMainHeader />

    <section
      class="container overflow-y-auto flex grow mx-auto z-0 sm:py-3 lg:pt-8 lg:p-5"
    >
      <slot />
    </section>
    <LayoutMainFooter />
  </div>
</template>

<script lang="ts" setup></script>
