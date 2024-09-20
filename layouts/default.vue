<template>
  <div class="bg-stone-100 dark:bg-slate-600 flex flex-col min-h-screen">
    <LayoutMainHeader />
    <section class="overflow-y-auto flex grow">
      <div class="h-full w-full">
        <slot />
      </div>
    </section>
    <LayoutMainFooter />
  </div>
</template>

<script lang="ts" setup></script>
