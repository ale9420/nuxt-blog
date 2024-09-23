<template>
  <div class="bg-stone-100 dark:bg-slate-600 flex flex-col min-h-screen">
    <LayoutMainHeader />
    <section class="overflow-y-auto flex items-center justify-center grow">
      <slot />
    </section>
    <LayoutMainFooter />
  </div>
</template>

<script lang="ts" setup></script>
