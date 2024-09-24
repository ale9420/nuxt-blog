<template>
  <footer
    class="flex sm:flex-col items-center bg-gradient-to-r from-red-700 to-red-800 text-neutral-50 p-5"
  >
    <NuxtLink class="text-3xl font-bold" to="/">BOG.DEV</NuxtLink>
    <span class="text-xs">{{ $t('meta.blogCategory') }}</span>
    <div class="flex gap-3 mt-4">
      <NuxtLink to="https://github.com/ale9420">
        <NuxtImg class="h-8 w-8" src="/github.png" />
      </NuxtLink>
      <NuxtLink
        to="https://www.linkedin.com/in/alejandro-ramirez-garcia-046713139/"
      >
        <NuxtImg class="h-8 w-8" src="/linkedin.png" />
      </NuxtLink>
    </div>
  </footer>
</template>

<script lang="ts" setup></script>
