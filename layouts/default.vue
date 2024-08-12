<template>
  <div class="bg-slate-100 dark:bg-slate-600 flex flex-col min-h-screen">
    <LayoutMainHeader />

    <section
      class="container overflow-y-auto flex grow mx-auto z-0 sm:py-3 lg:pt-8 lg:p-5"
    >
      <div class="h-full w-full">
        <slot />
      </div>
    </section>
    <LayoutMainFooter />
  </div>
</template>

<script lang="ts" setup></script>
